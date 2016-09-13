/* 
-----------------------------
Tests
-----------------------------

console.log('wif private key: '+btc_encode(new Buffer('0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D','hex'),new Buffer('80','hex')));
//5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ

console.log('private key from wif: '+btc_decode('5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ',new Buffer('80','hex')).toString('hex'));
//0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d

/* wallet.dat

# extended private masterkey: xprv9s21ZrQH143K4Wv2JLdfN8td2qVm8qTU7c7hD36gSfsnfNp7AjjgcaGiem5v7KvJnmpee8JeciN8dGvK5r2KZtEt8N4hgnQ3kRP6mQp2JVL

KyruVb9pCVBtxHvof6VrxB7GNk7fmqeSh1wFNwjubyuo4BJLfywz 2016-09-05T11:11:48Z hdseed=1 # addr=1Dk8v9pw3eAC1uXrQd2PhSwAq7pQr3VUs9 hdkeypath=m
L2qU5rvxgfiRVAd3DedNgHGHxUeBGQEvLMVscR1mffaR5URhjgHy 2016-09-05T11:11:48Z label= # addr=1PLEySkBy6c9LbEZ7V29WiieqdVGGFgyYh hdkeypath=m/0'/0'/0'
*/

//var key=getKeyfromExtended('xprv9s21ZrQH143K4Wv2JLdfN8td2qVm8qTU7c7hD36gSfsnfNp7AjjgcaGiem5v7KvJnmpee8JeciN8dGvK5r2KZtEt8N4hgnQ3kRP6mQp2JVL').key;
//var chaincode=getKeyfromExtended('xprv9s21ZrQH143K4Wv2JLdfN8td2qVm8qTU7c7hD36gSfsnfNp7AjjgcaGiem5v7KvJnmpee8JeciN8dGvK5r2KZtEt8N4hgnQ3kRP6mQp2JVL').chainCode;


console.log(key.toString('hex'));
//0bfe13930513cf7ad70bb34161f758417df200d6393e2301d49aa92a9cb6f777
console.log(chaincode.toString('hex'));
//f6dff350d088f62f444db026f5476e2f8ebf1df200da50e3ac2656b093b90dcd

console.log(getAddressfromPrivate(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de01','hex'))); //01 ==> compressed public keys
//1Dk8v9pw3eAC1uXrQd2PhSwAq7pQr3VUs9

//var hd=generate_keys_bip32(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'));

//hd.deriveChild(0).deriveChild(0).deriveChild(0);

/*
master seed chain code: f6dff350d088f62f444db026f5476e2f8ebf1df200da50e3ac2656b093b90dcd
master seed private key: 0bfe13930513cf7ad70bb34161f758417df200d6393e2301d49aa92a9cb6f777
master seed public key: 04468067c38b846a4af20520b0aae8dcd344391770d200eaf82cc8f391a44c6845a5db4e062450078091671e0d797315fec4e0227a216ddd186301f117cad895ab
master seed public key (compact): 03468067c38b846a4af20520b0aae8dcd344391770d200eaf82cc8f391a44c6845
master seed Extended private key: xprv9s21ZrQH143K4Wv2JLdfN8td2qVm8qTU7c7hD36gSfsnfNp7AjjgcaGiem5v7KvJnmpee8JeciN8dGvK5r2KZtEt8N4hgnQ3kRP6mQp2JVL
master seed Extended public key: xpub661MyMwAqRbcGzzVQNAfjGqMasLFYJBKUq3J1RWJ11QmYB9FiH3wANbCW4WCGJj1hT53TEuNSRYMRV511bhJzNDXnhtpjH3Szh6ZtFWxENS
master seed bitcoin address: 1LwHzDUFzPq6x2Fdm5aeDrM67YxaqKLnUk
------------------------------------ depth 1 index 2147483648
chain code: b1db88d41905272e036a187716a92d1c10352f2a214a2448dcef3d97ff7fe25d
private key: c9065bdee993a97d148f36ccba46644f67e4572a25a149b02d59bc73a3a1b543
public key: 04c8646a2ec82beb33177f295574e6a4d0cfcab0f64c4235b27e30b87336bac018083ff16361ceb481c52945eddfa3aa6026609254c24b49303cc42ffb9652948b
public key (compact): 03c8646a2ec82beb33177f295574e6a4d0cfcab0f64c4235b27e30b87336bac018
Extended private key: xprv9vWNbpbWyMLxiqYS5EVb4VDpeQMjqwrP5bXxHpnQFWTpy6NAKr8NpBT5EbMQ7XUpEAeUGcUei2RJceExjy1tstGnbFX46L4DrU3icyjekMA
Extended public key: xpub69Vj1L8QoiuFwKcuBG2bRdAZCSCEFQaESpTZ6DC1oqzoqthJsPSdMymZ5tKdaBt2UaaebeshY9nusFhohLYS62UZLgcXpnsQzRpYKLv2n3F
bitcoin address: 1FEbDGRWoP4eqP1NckvAU8ZFFscEdei8d7
------------------------------------ depth 2 index 2147483648
chain code: 9550fb648a08d4b0d6e6109a9f9ebe4c232b505f85af8934439d50055f01a0a9
private key: 81b70a0aca20e75f5ab28c7dff4761e25a52262d68f5091a25d69067f391b42d
public key: 044f5bf3a2b799714371f70ee4cd3472541d3d7cee28809b5ed157e0f6aea04edf18c6a034c0a7deebd79d763bc08a36d5a8e6b98169fe305acf170caab8432c57
public key (compact): 034f5bf3a2b799714371f70ee4cd3472541d3d7cee28809b5ed157e0f6aea04edf
Extended private key: xprv9wvqzVdaZo7ZLL2SkMjzceqSutNqNtfN36tQRu4HaNJemxmsEtpyqsxSTC9bGMTeQi4XaVWuRpKtBLV9kmcd1GW5nDAPn6kzhbsm3wdu3ec
Extended public key: xpub6AvCQ1AUQAfrYp6urPGzynnBTvDKnMPDQKp1EHTu8hqdem71nS9EPgGvJUjvcUJF4y7YRNgFwZ2kV43mhsZBH7rZ2V1iivJ4zuiohhVNRi1
bitcoin address: 1EdqLpZJ9wi9mBNwzQJp8T8Rs2uPBwuyup
------------------------------------ depth 3 index 2147483648
chain code: da57d72f15178feb3228e9eba32cecd2750ee0c2143b6b6fdce2e22f0e3fd47e
private key: a794e95400ccc3d5b2a42e089194e7bb596c9f93a481ae1a13641bbaec97aa04
public key: 04232efbaee1d1d006c2d4b18cf3960b74701900dedeae1c7efddd6ac308f43e02ff81a4deea68149a67ab6338d3c81a086cfb8c3d9000957d5807716259bbac94
public key (compact): 02232efbaee1d1d006c2d4b18cf3960b74701900dedeae1c7efddd6ac308f43e02
Extended private key: xprv9ymBKTjmhJHAgYqK7xReE57Cvgj2Nn9k7kf2YEYiUsb5MrMD8eCbokxnmGEM372b3GZcqsRJhpTmuZ3Z6m1N2SSqBMKaUdk8X96fW2dqeXR
Extended public key: xpub6CkXiyGfXfqTu2unDyxebD3wUiZWnEsbUyadLcxL3D84EegMgBWrMZHGcWFoYcg2vtSyZ9qXKcnZdzdvcQVSkeYEjUtYh1h4pz36h1iKmkx
bitcoin address: 1PLEySkBy6c9LbEZ7V29WiieqdVGGFgyYh
*/


//generate_keys_simple('toto');
/*
private key: 31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66
public key (compressed): 0235120e148979e25191400fe64f360db079b917ac367d322e44394db320b26988
bitcoin address: 12UB9cFE12ZBKZZaFWPxE1p574WxQuLVvY
private key wif: KxtqjBjoXGF76b5zGgYyRByGEo7cBLNM3Q3gKBmhv5DQRQbYvZkj
*/

//var hd=generate_keys_bip32(new Buffer('000102030405060708090a0b0c0d0e0f','hex')); //test vector BIP32

//hd.deriveChild(0);
/*
------------------------------------ master seed
master seed chain code: 873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508
master seed private key: e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35
master seed public key: 0439a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c23cbe7ded0e7ce6a594896b8f62888fdbc5c8821305e2ea42bf01e37300116281
master seed public key (compact): 0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2
master seed Extended private key: xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi
master seed Extended public key: xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8
master seed bitcoin address: 1ASH7cP56e26xBgdAjTerNzdD6VQHSfq1N
------------------------------------ depth 1 index 2147483648
private key: edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea
public key: 045a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc567f717885be239daadce76b568958305183ad616ff74ed4dc219a74c26d35f839
public key (compact): 035a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc56
Extended private key: xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7
Extended public key: xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw
bitcoin address: N4MBcq25BfBdhbQi5EwxgvVo4GJmhP9Ww

console.log(getKeyfromExtended('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi').key.toString('hex'));
//e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35
console.log(getKeyfromExtended('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi').chainCode.toString('hex'));
//873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508
/*

//create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex')); //test original wallet - compare wallet.txt and original_wallet_dump.txt

//create_wallet('My super wallet');

//var seed=btc_decode('8tbNfXcmPPmnrT3cLGMRoU6p8XGrT',new Buffer('80','hex'));
//seed=seed.slice(0,seed.length-1);

//oconsole('seed: '+seed.toString('utf8')); //My super wallet

//generate_keys_simple('',null,new Buffer('1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c','hex'));
//check btc address 16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY
/*
private key: 1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c
public key (compressed): 039e0a50d9f660d5e361ed47bb2d91f96ec360d86f8c377b4e02ed87e4217c4218
bitcoin address: 16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY
private key wif: KxDohMDu4iQ3GYMJGakyfCtcHtuGjqfcDLR2oUYEbNpkGJeTYmGq
*/