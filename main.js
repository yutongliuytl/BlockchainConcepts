const SHA256 = require('crypto-js/sha256');

class Block{
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor (){
        this.now = new Date();
        this.date = this.now.getDate().toString() + "/" + (this.now.getMonth()+1).toString() 
        + "/" + this.now.getFullYear().toString();
        this.chain = [this.generateGenesisBlock()];
    }
    generateGenesisBlock(){
        return new Block(0, this.date, "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
            if(currentBlock.hash != currentBlock.generateHash()){
                return false;
            }
        }

        return true;
    }
}

let YTL = new BlockChain();
YTL.addBlock(new Block(1, YTL.date, {amount: 6}));
YTL.addBlock(new Block(2, YTL.date, {amount: 9}));

console.log(JSON.stringify(YTL, null, 4));
console.log("Is chain valid? " + YTL.isChainValid());

YTL.chain[1].data = {amount: 69};

console.log(JSON.stringify(YTL, null, 4));
console.log("Is chain valid? " + YTL.isChainValid());

