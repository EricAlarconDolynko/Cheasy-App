const { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction, sysvarClock, sysvarRent} = require('@solana/web3.js');

async function createTokenMint(connection, payer, decimals = 6) {
  
    const mintAccount = new PublicKey("4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K"); 

    const tokenProgramId = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mintAccount,
            space: 100, 
            lamports: await connection.getMinimumBalanceForRentExemption(82),
            programId: tokenProgramId,
        }),
        new TransactionInstruction({
            keys: [
                { pubkey: mintAccount, isSigner: true, isWritable: true },
                { pubkey: sysvarClock, isSigner: false, isWritable: false },
                { pubkey: sysvarRent, isSigner: false, isWritable: false },
                { pubkey: payer, isSigner: true, isWritable: false }
            ],
            programId: tokenProgramId,
            data: Buffer.from([6, decimals]), 
        })
    );

    const signature = await connection.sendTransaction(transaction, [payer]);

    console.log('Transaction signature:', signature);
    console.log('Token mint account:', mintAccount.toBase58());

    return mintAccount;
}

async function main() {
    const connection = new Connection("https://api.devnet.solana.com");

    const payer = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    await createTokenMint(connection, payer);
}

main().catch(console.error);
