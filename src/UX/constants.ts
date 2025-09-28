export const DEVNET_COUNTER_PACKAGE_ID = "0xTODO";
export const TESTNET_COUNTER_PACKAGE_ID =
  "0x4ebf993c0216ba7857cdc06e003129ae323a57a195b80ad04dc95a4ce2d63909";
export const MAINNET_COUNTER_PACKAGE_ID = "0xTODO";

export const ADMIN_CAP_TYPE =
  "0x4ebf993c0216ba7857cdc06e003129ae323a57a195b80ad04dc95a4ce2d63909::ChainExam::AdminCap";
export const STUDENT_CAP_TYPE =
  "0x4ebf993c0216ba7857cdc06e003129ae323a57a195b80ad04dc95a4ce2d63909::ChainExam::StudentCap";
export const CORRECTOR_CAP_TYPE =
  "0x4ebf993c0216ba7857cdc06e003129ae323a57a195b80ad04dc95a4ce2d63909::ChainExam::CorrectorCap";
export const PUBLISHER_OBJECT = "0x2::package::Publisher";
export const ALL_CAPS = [
  { StructType: ADMIN_CAP_TYPE },
  { StructType: STUDENT_CAP_TYPE },
  { StructType: CORRECTOR_CAP_TYPE },
];

export const API_ENDPOINT = "http://127.0.0.1:5000/api/ocr";
