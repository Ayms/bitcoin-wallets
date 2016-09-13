var crypto=require('crypto');
var bs58=require('bs58');
var BN=require('./node_modules/elliptic/node_modules/bn.js');
var EC=require('elliptic').ec;
var ec=new EC('secp256k1');
var fs=require('fs');
var MASTER_SECRET=new Buffer('Bitcoin seed');
var HARDENED_OFFSET=0x80000000;
var BITCOIN_VERSIONS={private:0x0488ADE4,public:0x0488B21E};
var DEFAULT_WALLET_NB=100;
var ecparams=ec.curve;
var oconsole=console.log.bind(console);
var CRLF='\r\n';

var display=function(hd,bool) {
	var seed='';
	if (bool) {
		seed='master seed ';
	};
	console.log('------------------------------------ '+(seed?(seed+' '+hd.seed.toString('hex')):('depth '+hd.depth+' index hardened '+(hd.index-HARDENED_OFFSET))));
	console.log(seed+'chain code: '+hd.chainCode.toString('hex'));
	console.log(seed+'private key: '+hd.privateKey.toString('hex'));
	console.log(seed+'public key: '+hd.publicKeyl.toString('hex'));
	console.log(seed+'public key (compact): '+hd.publicKey.toString('hex'));
	console.log(seed+'Extended private key: '+btc_encode(serialize(hd,'private')));
	console.log(seed+'Extended public key: '+btc_encode(serialize(hd,'public')));
	console.log(seed+'bitcoin address: '+hd.address);
};

var hash_160=function(buf) {
	buf=bs=crypto.createHash('sha256').update(buf).digest();
	buf=crypto.createHash('ripemd160').update(buf).digest();
	return buf;
};

var add_entropy=function(buf) {
	//TODO
	return buf;
};

var privateKeyderive=function(privateKey,IL) {
	var bn=new BN(IL);
	var n=ecparams.n;
	if (bn.cmp(n)>=0) {
		throw new Error();
	};
	bn.iadd(new BN(privateKey));
	if (bn.cmp(n)>=0) { //check bn docs, probably better way to do this
		bn=bn.mod(n);
	};
	if (bn.isZero()) {
		throw new Error();
	};
	return bn.toBuffer('be',32);
};

var publicKeyderive=function() {};

var btc_encode=function(buf,version) {
	var checksum;
	if (version) {
		buf=Buffer.concat([version,buf]);
	};
	checksum=crypto.createHash('sha256').update(buf).digest();
	checksum=crypto.createHash('sha256').update(checksum).digest();
	checksum=checksum.slice(0,4);
	return bs58.encode(Buffer.concat([buf,checksum]));
};

var btc_decode=function(bs,version) { //bs string
	var buf=new Buffer(bs58.decode(bs),'hex');
	if (version) {
		buf=buf.slice(version.length);
	};
	return buf.slice(0,buf.length-4);
};

var getKeyfromExtended=function(extended) { //extended string
	var buf=btc_decode(extended);
	return {chainCode:buf.slice(13,45),key:buf.slice(46,78)};
};

var getAddressfromPrivate=function(privateKey,version) { //privateKey buffer
	var compressed=false;
	version=version?(new Buffer([version])):(new Buffer('00','hex'));
	if (privateKey.length>32) {
		privateKey=privateKey.slice(0,32); //remove 01 indicating the use of compressed public keys
		compressed=true;
	};
	var publicKey=new Buffer(ec.keyFromPrivate(privateKey).getPublic(compressed,'arr'),'hex');
	return (btc_encode(hash_160(publicKey),version));
};

var serialize=function(hd,version) {
	//version(4) depth(1) fingerprint(4) index(4) chain(32) key(33) - 78 bytes
	var buffer=new Buffer(13);
	var key;
	if (version==='private') {
		version=BITCOIN_VERSIONS.private;
		key=Buffer.concat([new Buffer([0]),hd.privateKey]);
	} else {
		version=BITCOIN_VERSIONS.public;
		key=hd.publicKey;
	};
	buffer.writeUInt32BE(version,0);
	buffer.writeUInt8(hd.depth,4);
	var fingerprint = hd.depth?hd.parentFingerprint:0x00000000;
	buffer.writeUInt32BE(fingerprint,5);
	buffer.writeUInt32BE(hd.index,9);
	buffer=Buffer.concat([buffer,hd.chainCode]);
	buffer=Buffer.concat([buffer,key]);
	return buffer;
};

var deriveChild=function(index,version) {
	//var isHardened=index>=HARDENED_OFFSET;
	var hd={};
	var isHardened=true;
	var indexBuffer=new Buffer(4);
	indexBuffer.writeUInt32BE(index+HARDENED_OFFSET,0);
	version=version?(new Buffer([version])):(new Buffer('00','hex'));
	var data;
	if (isHardened) {
		// 0x00 priv (32B)  index (4B);
		data=Buffer.concat([new Buffer([0]),this.privateKey,indexBuffer]);
	} else {
		data=Buffer.concat([this.publicKey,indexBuffer]);
	};
	var I=crypto.createHmac('sha512',this.chainCode).update(data).digest();
	var IL=I.slice(0,32);
	var IR=I.slice(32);
	if (this.privateKey) {
		try {
			hd.privateKey=privateKeyderive(this.privateKey,IL);
			hd.publicKey=new Buffer(ec.keyFromPrivate(hd.privateKey).getPublic(true,'arr'),'hex');
			hd.publicKeyl=new Buffer(ec.keyFromPrivate(hd.privateKey).getPublic('arr'),'hex');
			hd.address=btc_encode(hash_160(hd.publicKey),version); //default is supposed to be compressed keys
		} catch (err) {
			return;
		};
	} else {
		try {
			hd.publicKey=publicKeyderive(this.publicKey,IL);
		} catch (err) {
			return;
		};
	};
	hd.fingerprint=hash_160(hd.publicKey).slice(0,4).readUInt32BE(0);
	hd.chainCode=IR;
	hd.depth=this.depth+1;
	hd.parentFingerprint=this.fingerprint;
	hd.index=index+HARDENED_OFFSET;
	//hd.deriveChild=()=>{deriveChild};
	hd.deriveChild=deriveChild.bind(hd);
	display(hd);
	return hd;
};

var generate_keys_simple=function(str,version,buf) {
	var pub,priv,bs;
	var hd={};
	version=version?(new Buffer([version])):(new Buffer('00','hex'));
	if (!buf) {
		if (!Buffer.isBuffer(str)) {
			str=new Buffer(str,'utf8');
		};
		priv=crypto.createHash('sha256').update(str).digest();
	} else {
		priv=buf;
	};
	console.log('private key: '+priv.toString('hex'));
	pub=new Buffer(ec.keyFromPrivate(priv).getPublic(true,'arr'),'hex');
	console.log('public key (compressed): '+pub.toString('hex'));
	bs=btc_encode(hash_160(pub),version);
	console.log('bitcoin address: '+bs);
	console.log('private key wif: '+btc_encode(Buffer.concat([priv,new Buffer('01','hex')]),new Buffer('80','hex')));
};

var generate_keys_bip32=function(str,version) {
	var pub,compact,priv,hmac;
	var hd={};
	version=version?(new Buffer([version])):(new Buffer('00','hex'));
	if (!Buffer.isBuffer(str)) {
		str=new Buffer(str,'utf8');
		add_entropy(str);
	};
	hmac=crypto.createHmac('sha512',MASTER_SECRET).update(str).digest();
	hd.seed=str;
	hd.privateKey=hmac.slice(0,32);
	hd.chainCode=hmac.slice(32);
	hd.publicKeyl=new Buffer(ec.keyFromPrivate(hd.privateKey).getPublic('arr'),'hex'); //long 65 bytes
	hd.publicKey=new Buffer(ec.keyFromPrivate(hd.privateKey).getPublic(true,'arr'),'hex'); //compact 33 bytes
	hd.address=btc_encode(hash_160(hd.publicKey),version); //default is supposed to be compressed keys
	hd.fingerprint=hash_160(hd.publicKey).slice(0,4).readUInt32BE(0);
	hd.index=0;
	hd.depth=0;
	display(hd,true);
	//hd.deriveChild=()=>{deriveChild};
	hd.deriveChild=deriveChild.bind(hd);
	return hd;
};

var create_wallet=function(str,secret,nb,version) {
	var tmp,txt,priv,seed;
	var time=new Date().toISOString();
	nb=nb||DEFAULT_WALLET_NB;
	var streamlog=fs.createWriteStream('log.txt');
	streamlog.on('open',function() {
		console.log=function(txt) {
			streamlog.write(txt+CRLF);
			oconsole(txt);
		};
		var stream=fs.createWriteStream('wallet.txt');
		stream.on('open',function() {
			var hd=generate_keys_bip32(str,version);
			if (!secret) {
				txt='# extended private masterkey: '+btc_encode(serialize(hd,'private'));
				stream.write(txt+CRLF+CRLF);
				if (!Buffer.isBuffer(str)) {
					str=new Buffer(str,'utf8');
				};
				if (!version) { //default is btc core compressed public keys
					seed=Buffer.concat([str,new Buffer('01','hex')]);
				} else {
					seed=str;
				};
				txt=btc_encode(seed,new Buffer('80','hex'))+' '+time+' hdseed=1 '+' # addr='+getAddressfromPrivate(seed)+' hdkeypath=m';
				stream.write(txt+CRLF);
			};
			hd=hd.deriveChild(0).deriveChild(0);
			for (var i=0;i<nb;i++) {
				tmp=hd.deriveChild(i);
				if (!version) { //default is btc core compressed public keys
					priv=Buffer.concat([tmp.privateKey,new Buffer('01','hex')]);
				} else {
					priv=tmp.privateKey;
				};
				txt=btc_encode(priv,new Buffer('80','hex'))+' '+time+' '+(i?'reserve=1':'label=')+' # addr='+getAddressfromPrivate(priv)+(secret?"":" hdkeypath=m/0'/0'/'"+i+"'");
				stream.write(txt+CRLF);
			};
			stream.end();
			streamlog.end();
		});
	});
};

module.exports.generate_keys_simple=generate_keys_simple;
module.exports.generate_keys_bip32=generate_keys_bip32;
module.exports.create_wallet=create_wallet;