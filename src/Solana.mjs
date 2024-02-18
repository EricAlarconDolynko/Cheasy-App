import { Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import "@solana/spl-token";

const tokenMint = await createMint(
    "https://api.devnet.solana.com",
    "4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K",
    "4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K",
    "4Gi7cQZEMWiJ9PtVjTRYT78ehNYCW8XtcU1rLhH7iH3K",
    6
  );

