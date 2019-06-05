bitcoin-wallets
===

Bitcoin (BTC, BCH, BTG, etc) and [Zcash](https://github.com/Ayms/zcash-wallets) wallets made simple, javascript implementation of [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Bitcoin hierarchical deterministic keys

## History

<b>Please note that this module is now deprecated, please see [bitcoin-transactions](https://github.com/Ayms/bitcoin-transactions) since it has been merged there</b>

## Rationale

Create your bitcoin addresses and wallets by your own and recover them from a phrase (but please read the warning below)/seed you know if you lose them, this eliminates the constant need of wallets backup with the associated risks and this eliminates the risk of losing all of your addresses (then your money)

Convert your original bitcoin address to a bitcoin fork address (Bitcoin Cash, Bitcoin Gold, etc) or any coin address to another one

## Conversion

Given the increasing number of forks that are occurring this module allows non expert users to easily match addresses from their original wallet to a bitcoin fork address (Bitcoin Cash, Bitcoin Gold, etc), so you don't need to regenerate one wallet for each fork

## Implementation

This module is using [elliptic](https://github.com/indutny/elliptic) and [bs58](https://github.com/cryptocoinjs/bs58), the code is inspired from [hdkey](https://github.com/cryptocoinjs/hdkey)

## Details

There are quasi no standards for bitcoin wallets, every bitcoin client proposes a specific one and generally does not let you generate your keys, the reason invoked for this is to protect the users from generating insecure keys that could be discovered and stolen by an attacker

[Bitcoin core](https://github.com/bitcoin/bitcoin) has recently implemented as the default partially [BIP32](https://github.com/bitcoin/bitcoin/pull/8035) which generates first 100 addresses from a seed chosen by the software

We don't think that it's necessarily a good idea to trust a software, even open source, to choose the main seed for you knowing that all of your keys depend on it and are generated from this master seed (which is typically a 32 bytes sequence)

This implementation is mainly following the bitcoin core wallet format but lets you decide for the seed, you can reuse the information generated for other wallets, you can select from the addresses generated which ones you will use and break the tree dependencies

## Can we trust BIP32?

There are good signs that we can but of course if all your addresses depend on a tree algorithm then, even if unlikely, the possibility still exists to revert it and discover the seed from your keys, then discover all of your keys. Another possibility, probably unlikely also, is to find patterns allowing to fingerprint all the keys generated so finally people can trace you.

Surprisingly from ~32 bytes keys BIP32 ends up with a 78 bytes format to describe them with all the necessary information like indexes, parent to possibly allow to revert the tree

Bitcoin core derives two addresses from a seed and then derives all the other addresses from it, this constitute one branch in the tree and the (hardened) addresses are represented by m/0/i where i is the number of the key, when 100 addresses are used it generates others following the same principle

bitcoin-wallets do the same but introduces a secret option where the reference to the tree for each key is not indicated in the wallet, neither the master seed and master key (so you should better make sure you will be able to recover it if you use this option)

## Warning

For now you should not use this module (except for conversion purposes) if you are not an expert to choose a seed with enough entropy (ie 128 bits) and you should not use the possibility to derive keys from a phrase

Indeed, human phrases are known to be predictable with considerably less (ie ridiculous) entropy than a seed generated with a prng

Do not think you are stronger than the theory and will generate a human phrase with 128 bits of entropy, you won't

Other methods exist to remember more easily your seed than a 32 bytes sequence, for example [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) or [Electrum](http://docs.electrum.org/en/latest/seedphrase.html)

But choosing x words among a set of y words in a dictionary to reach the required entropy is still not something a human being will easily remember, it will have to be written somewhere, so we can question why it can be considered easier than writing a 32 bytes sequence, question of appreciation, people like it apparently

This is an ongoing TODO but one of the goals here would be to generate a seed from phrases/information that a human being can really remember, more to come...

## Installation

Just create a folder, copy index.js and install via npm [elliptic](https://github.com/indutny/elliptic) and [bs58](https://github.com/cryptocoinjs/bs58)

## Use - Generate keys

	generate_keys_simple('toto'); //Never use this! The private key is the hash256 of the utf8 representation of the phrase
	/*
	private key: 31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66
	public key (compressed): 0235120e148979e25191400fe64f360db079b917ac367d322e44394db320b26988
	bitcoin address: 12UB9cFE12ZBKZZaFWPxE1p574WxQuLVvY
	private key wif: KxtqjBjoXGF76b5zGgYyRByGEo7cBLNM3Q3gKBmhv5DQRQbYvZkj
	*/
	
	Bitcoin Core (0x00 p2pkh, 0x05 p2sh) - default then version can be set to null
	
	generate_keys_simple('',null,new Buffer('1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c','hex')); //the private key is the buffer you pass
	/*
	private key: 1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c
	public key (compressed): 039e0a50d9f660d5e361ed47bb2d91f96ec360d86f8c377b4e02ed87e4217c4218
	bitcoin address: 16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY
	private key wif: KxDohMDu4iQ3GYMJGakyfCtcHtuGjqfcDLR2oUYEbNpkGJeTYmGq
	*/
	
	Bitcoin Cash (0x1c p2pkh, 0x28 p2sh)
	
	generate_keys_simple('',new Buffer('1c','hex'),new Buffer('1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c','hex')); //the private key is the buffer you pass
	
	/*
	private key: 1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c
	public key (compressed): 039e0a50d9f660d5e361ed47bb2d91f96ec360d86f8c377b4e02ed87e4217c4218
	bitcoin cash address: CNNj75JfhZaZbBUj3TsXbtwtdEsUGaQ6qi
	private key wif: KxDohMDu4iQ3GYMJGakyfCtcHtuGjqfcDLR2oUYEbNpkGJeTYmGq
	*/
	
	Bitcoin Gold (0x26 p2pkh, 0x17 p2sh)
	
	generate_keys_simple('',new Buffer('26','hex'),new Buffer('1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c','hex')); //the private key is the buffer you pass
	
	/*
	private key: 1de2e396a194570339c2289a71d98bdb11c2dc204df06f8e4841028f9179739c
	public key (compressed): 039e0a50d9f660d5e361ed47bb2d91f96ec360d86f8c377b4e02ed87e4217c4218
	bitcoin gold address: GPkkxAHYoNDKmWsbHfCiT9fkvHSuShfFcc
	private key wif: KxDohMDu4iQ3GYMJGakyfCtcHtuGjqfcDLR2oUYEbNpkGJeTYmGq
	*/

	var hd=generate_keys_bip32(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'));

	hd.deriveChild(0).deriveChild(0).deriveChild(0); /m/0/0
	
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

	
## Use - Generate wallets
	
Output is stored in wallet.txt, all details for the keys are stored in log.txt (recommended to backup somewhere)

	Bitcoin Core

	create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex')); //see /tests/wallet.txt and compare with original_wallet_dump.txt

	create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'),true); //see /tests/wallet_secret.txt
	
	create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'),null or true,1000); //generates 1000 keys, default is 100
	
	create_wallet('My super wallet');//see /tests/my_super_wallet.txt - Again, never use this for now
	
	Bitcoin Cash
	
	Generate the same wallet as Bitcoin Core's one above for Bitcoin Cash
	
	create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'),null or true, null or number, new Buffer('1c','hex'))
	
	Bitcoin Gold
	
	Generate the same wallet as Bitcoin Cores's one above for Bitcoin Gold
	
	create_wallet(new Buffer('4ecf2e71d567072fe2f9cda40873afcaae4224e3f249018621a90dd43e88f8de','hex'),null or true, null or number, new Buffer('26','hex'))
	
	
## Use - Convert bitcoin addresses

Convert an address from one network to another one - convert(address,inversion,outversion)

	Bitcoin Cash
	
	convert('16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY',new Buffer('00','hex'),new Buffer('1c','hex'));
	
	Address 16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY converted to CNNj75JfhZaZbBUj3TsXbtwtdEsUGaQ6qi
	
	Bitcoin Gold
	
	convert('16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY',new Buffer('00','hex'),new Buffer('26','hex'));
	
	Address 16uqY2xbpWc2h3aJMiYc2PKs17f4NyQ8GY converted to GPkkxAHYoNDKmWsbHfCiT9fkvHSuShfFcc
	
	Bitcoin Cash to Bitcoin Gold
	
	convert('CNNj75JfhZaZbBUj3TsXbtwtdEsUGaQ6qi',new Buffer('1c','hex'),new Buffer('26','hex'));
	
	Address CNNj75JfhZaZbBUj3TsXbtwtdEsUGaQ6qi converted to GPkkxAHYoNDKmWsbHfCiT9fkvHSuShfFcc
	
## Wallets import/export

In bitcoin core, open the debug console (Help/Debug console)
	
To dump your current wallet use ``dumpwallet wallet.txt``

Note: hdmaster, renamed hdseed here, is your master seed, see the Tools below if you want to get its hex representation

To import your bitcoin-wallets, put your wallet.txt in the bitcoin core root directory and use ``importwallet wallet.txt``

Again you can choose among the keys generated by bitcoin-wallets those that you want to put in your final wallet.txt (that's why you should better keep log.txt if you want later to reconciliate the keys chosen with the tree)

Currently importing keys as described above does not remove previous keys, [request](https://github.com/bitcoin/bitcoin/issues/8684) made to the bitcoin core team which is apparently implementing too a way to create keys from a user chosen private key/seed - watch [Wallet - add option for a custom extended master privat key (xpriv)](https://github.com/bitcoin/bitcoin/pull/8735)

## Other formats

The default bitcoin client version is bitcoin core (then compressed format is used for public keys and address derivation, 01 is added to private keys representation), please feel free to post bug/PR and/or contact us for other versions

## Tools

See various uses and tools in tests/tests.js (a bit messy, yes, but useful)

## License

MIT

## Related projects :

* [Ayms/zcash-wallets](https://github.com/Ayms/zcash-wallets)
* [Ayms/bittorrent-nodeid](https://github.com/Ayms/bittorrent-nodeid)
* [Ayms/torrent-live](https://github.com/Ayms/torrent-live)
* [Ayms/node-Tor](https://github.com/Ayms/node-Tor)
* [Ayms/iAnonym](https://github.com/Ayms/iAnonym)
* [Interception Detector](http://www.ianonym.com/intercept.html)
* [Ayms/abstract-tls](https://github.com/Ayms/abstract-tls)
* [Ayms/websocket](https://github.com/Ayms/websocket)
* [Ayms/node-typedarray](https://github.com/Ayms/node-typedarray)
* [Ayms/node-dom](https://github.com/Ayms/node-dom)
* [Ayms/node-bot](https://github.com/Ayms/node-bot)
* [Ayms/node-gadgets](https://github.com/Ayms/node-gadgets)
