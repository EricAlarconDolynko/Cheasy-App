const { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction } = require('@solana/web3.js');

async function storeToken(connection, payer, mintAccount, tokenOwner, amount) {
  
    const tokenAccount = new PublicKey(); 

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: tokenAccount,
            space: 165, // Token account size
            lamports: await connection.getMinimumBalanceForRentExemption(165),
            programId: new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K'), 
        }),
        new TransactionInstruction({
            keys: [
                { pubkey: tokenOwner, isSigner: false, isWritable: true },
                { pubkey: tokenAccount, isSigner: true, isWritable: true },
                { pubkey: mintAccount, isSigner: false, isWritable: false },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
            ],
            programId: new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K'), 
            data: Buffer.from([3, ...amount.toBuffer('le', 8)]) 
        })
    );

    const signature = await connection.sendTransaction(transaction, [payer]);

    console.log('Transaction signature:', signature);
    console.log('Token account:', tokenAccount.toBase58());

    return tokenAccount;
}

async function main() {
    // Connect to the Solana cluster
    const connection = new Connection('https://api.solana-beta.solana.com');

    const payer = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    const mintAccount = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    const tokenOwner = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    const amount = BigInt(1000000000); 

    await storeToken(connection, payer, mintAccount, tokenOwner, amount);
}

main().catch(console.error);
