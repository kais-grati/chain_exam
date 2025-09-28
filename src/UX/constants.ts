export const DEVNET_COUNTER_PACKAGE_ID = "0xTODO";
export const PACKAGE_ID =
  "0x4ebf993c0216ba7857cdc06e003129ae323a57a195b80ad04dc95a4ce2d63909";
export const MAINNET_COUNTER_PACKAGE_ID = "0xTODO";

export const ADMIN_CAP_TYPE = PACKAGE_ID + "::ChainExam::AdminCap";
export const STUDENT_CAP_TYPE = PACKAGE_ID + "::ChainExam::StudentCap";
export const CORRECTOR_CAP_TYPE = PACKAGE_ID + "::ChainExam::CorrectorCap";
export const ADMIN_STATE_TYPE = PACKAGE_ID + "::ChainExam::AdminState";
export const EXAM_NFT_TYPE = PACKAGE_ID + "::ChainExam::ExamNFT";
export const ANONYMIZE_EXAM_TYPE = PACKAGE_ID + "::ChainExam::AnonymizeExam";
export const FEEDBACK_TYPE = PACKAGE_ID + "::ChainExam::Feedback"
export const PUBLISHER_OBJECT = "0x2::package::Publisher";
export const ALL_CAPS = [
  { StructType: ADMIN_CAP_TYPE },
  { StructType: STUDENT_CAP_TYPE },
  { StructType: CORRECTOR_CAP_TYPE },
];

export const API_ENDPOINT = "http://127.0.0.1:5000/api/ocr";
