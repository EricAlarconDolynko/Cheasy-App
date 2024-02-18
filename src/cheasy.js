const { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction, sysvarClock, sysvarRent} = require('@solana/web3.js');

async function createTokenMint(connection, payer, decimals = 6) {
    // Generate a new token account for the mint
    const mintAccount = new PublicKey("4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K"); // Use a valid public key for the mint account

    // Generate a new token mint
    const tokenProgramId = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mintAccount,
            space: 100, // Token mint size
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
            data: Buffer.from([0, decimals]), // Initialize mint instruction (0 for decimals)
        })
    );

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [payer]);

    console.log('Transaction signature:', signature);
    console.log('Token mint account:', mintAccount.toBase58());

    return mintAccount;
}

async function main() {
    // Connect to the Solana cluster
    const connection = new Connection("https://api.devnet.solana.com");

    // Example payer account (replace with your own)
    const payer = new PublicKey('4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K');

    // Create a new token mint
    await createTokenMint(connection, payer);
}

main().catch(console.error);
