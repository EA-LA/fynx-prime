/**
 * Stripe Price ID mapping.
 * Key format: "{accountSizeK}_{phaseNumber}"
 * e.g. "100k_1" = $100K 1-phase challenge
 */
export const PRICE_MAP: Record<string, string> = {
  "5k_1": "price_1T7InPKF1DV2t1wMV678orSg",
  "5k_2": "price_1T7IqFKF1DV2t1wMOyPUJr62",
  "5k_3": "price_1T7Ir1KF1DV2t1wMUevB22xG",

  "10k_1": "price_1T7IvUKF1DV2t1wMnPW0P4Kk",
  "10k_2": "price_1T7IxPKF1DV2t1wMnC0HGzgP",
  "10k_3": "price_1T7IzyKF1DV2t1wMt83rbhMD",

  "25k_1": "price_1T7J2AKF1DV2t1wMrsFshawf",
  "25k_2": "price_1T7JCuKF1DV2t1wMoUVSVUVE",
  "25k_3": "price_1T7JDPKF1DV2t1wMr71qLkm4",

  "50k_1": "price_1T7JF4KF1DV2t1wMnIKlooij",
  "50k_2": "price_1T7JGEKF1DV2t1wMhM2r7nXw",
  "50k_3": "price_1T7JGkKF1DV2t1wMSMXD6aEY",

  "100k_1": "price_1T7JIBKF1DV2t1wMTN1FZ6hW",
  "100k_2": "price_1T7JIkKF1DV2t1wMs4vXxDKX",
  "100k_3": "price_1T7JJAKF1DV2t1wMq5v5kHLD",

  "200k_1": "price_1T7JL2KF1DV2t1wMwnU5HBA7",
  "200k_2": "price_1T7JLbKF1DV2t1wMbM6kMC5m",
  "200k_3": "price_1T7JM3KF1DV2t1wM7u3Eusj0",
};
