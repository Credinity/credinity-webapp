import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, FormikProps } from "formik";
import { Checkbox, CircularProgress, Grid, Link } from "@mui/material";
import { Gainsboro, Ladybug } from "@/public/constants/color.constant";
import FormikTextField from "@/components/input/FormikTextField";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { SignUpFormProps } from "@/models/auth.model";
import {
  setOtpProcessing,
  setSignUpProcessing,
  signUpAsync,
  userSelector,
} from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import writeLog from "@/utils/logUtils";
import PageContainer from "@/components/layout/PageContainer";
import {
  pageSelector,
  setIsOpenPrivacyConterm,
} from "@/store/slices/pageSlice";
import CustomizedDialogs from "@/components/dialog/CustomizedDialogs";

const initialValues: SignUpFormProps = {
  email: "",
  password: "",
  confirmPass: "",
  phoneNo: "",
  confirmOtp: "",
  isAgreeCond: false,
};

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const page = useSelector(pageSelector);
  let submitAction: string | undefined = undefined;

  const registerForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
  }: FormikProps<SignUpFormProps>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Typography fontWeight="medium" sx={{ mb: 1 }}>
          Email
        </Typography>
        <FormikTextField
          id="Email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          fullWidth
          sx={{ mb: 1 }}
          disabled={user.isDisableInput}
          onChange={handleChange}
          value={values.email}
        />
        <Typography fontWeight="medium" sx={{ my: 1 }}>
          Password
        </Typography>
        <FormikTextField
          id="Password"
          type="password"
          name="password"
          placeholder="Password"
          required
          fullWidth
          sx={{ mb: 1 }}
          disabled={user.isDisableInput}
          onChange={handleChange}
          value={values.password}
        />

        <Typography fontWeight="medium" sx={{ my: 1 }}>
          Confirm Password
        </Typography>
        <FormikTextField
          id="ConfirmPassword"
          type="password"
          name="confirmPass"
          placeholder="Confirm Password"
          required
          fullWidth
          sx={{ mb: 1 }}
          disabled={user.isDisableInput}
          onChange={handleChange}
          value={values.confirmPass}
        />

        <Grid container spacing={1}>
          <Grid item xs={7} sx={{ mb: 1 }}>
            <Typography fontWeight="medium" sx={{ my: 1 }}>
              Phone Number
            </Typography>
            <FormikTextField
              id="PhoneNumber"
              type="text"
              name="phoneNo"
              placeholder="XXX-XXX-XXXX"
              required
              fullWidth
              sx={{ mb: 1 }}
              onChange={handleChange}
              value={values.phoneNo}
              disabled={true}
              //todo : OTP Flow
              //disabled={user.isDisableInput}
            />
          </Grid>
          <Grid
            item
            container
            xs={5}
            justifyContent="	flex-start"
            sx={{ mt: 4.7, mb: 2.3 }}
          >
            {user.isOtpProcessing ? (
              <CircularProgress />
            ) : (
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                disabled={true}
                onClick={() => {
                  submitAction = "otpAction";
                  handleSubmit();
                }}
              >
                <Typography variant="body2">Request OTP</Typography>
              </Button>
            )}
          </Grid>
        </Grid>

        <Typography fontWeight="medium" sx={{ mb: 1 }}>
          Confirm OTP
        </Typography>
        <FormikTextField
          id="ConfirmOtp"
          type="Text"
          name="confirmOtp"
          placeholder="Confirm OTP"
          required
          fullWidth
          sx={{ mb: 1 }}
          onChange={handleChange}
          value={values.confirmOtp}
          disabled={true}
          //disabled={isLoading}
        />

        {user.error ? (
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{ mb: 2 }}
          >
            <Typography variant="h4" color={Ladybug}>
              {user.error}
            </Typography>
          </Grid>
        ) : null}

        <Grid container sx={{ ml: 5, my: 1.3 }} alignItems="center">
          <Grid
            item
            xs={0.5}
            sx={{ mr: 1.2 }}
            justifyContent="center"
            display="flex"
          >
            <Checkbox
              id="isAgreeCond"
              name="isAgreeCond"
              sx={{
                color: user.isRedCheckBox ? Ladybug : Gainsboro,
              }}
              checked={values.isAgreeCond}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={10}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Typography display="inline" sx={{ mr: 1 }}>
              I agree to Credinity&apos;s
              {/* <Link display="inline" href="" color="primary">
                Service Agreement
              </Link> */}
              &nbsp;
              <Link
                display="inline"
                href=""
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setIsOpenPrivacyConterm(true));
                }}
              >
                Privacy policy
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" sx={{ mb: 2 }}>
          {user.isProcessing ? (
            <CircularProgress />
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              disabled={user.isProcessing}
              onClick={() => {
                submitAction = "signUpAction";
                handleSubmit();
              }}
            >
              <Typography>SIGN UP</Typography>
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography display="inline" fontWeight="medium" sx={{ mr: 1 }}>
            Already have an account? &nbsp;
            <Link href="" color="primary">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Form>
    );
  };

  return (
    <PageContainer
      pageName="Sign Up"
      loading={user.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <Grid container direction="column" minHeight="100vh" spacing={0}>
        <Grid item alignSelf="center" sx={{ mt: 4 }}>
          <Image
            src="/img/credinity-tr-logo.png"
            alt="credinity logo"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={12} sx={{ mx: 4 }}>
          <Formik
            initialValues={initialValues!}
            onSubmit={async (values) => {
              if (submitAction === "signUpAction") {
                dispatch(setSignUpProcessing(true));
                const res = await dispatch(signUpAsync(values));
                if (res) writeLog(`signup page =>${JSON.stringify(res)}`);
                dispatch(setSignUpProcessing(false));
              } else if (submitAction === "otpAction") {
                dispatch(setOtpProcessing(true));
                //todo OTP Service
                dispatch(setOtpProcessing(false));
              } else {
                writeLog("something wrong");
              }
            }}
          >
            {(signUpProps) => registerForm(signUpProps)}
          </Formik>
        </Grid>
        <Grid item xs={12} sx={{ mx: 4 }}>
          <CustomizedDialogs
            title="นโยบายรักษาข้อมูลส่วนบุคคล"
            htmlDetail={TestHtml()}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

function TestHtml() {
  return '<h1>นโยบายรักษาข้อมูลส่วนบุคคล</h1>\n<p>\n    นโยบายรักษาข้อมูลส่วนบุคคลนี้จัดทำขึ้นมาเพื่อให้ท่านได้อ่านและทำความเข้าใจนโยบายการรักษาข้อมูลส่วนบุคคลภายใต้การให้บริการของบริษัท เครดินิตี้ จำกัด โดยท่านได้อ่าน ยินยอม และเข้าใจนโยบายรักษาข้อมูลส่วนบุคคล\nตามด้านล่างนี้ </p>\n<p>\n    บริษัท เครดินิตี้ จำกัด ("เครดินิตี้")\nเคารพสิทธิในความเป็นส่วนตัวของข้อมูลของท่าน\nและตระหนักถึงความสำคัญของของการรักษาความปลอดภัยของข้อมูลส่วนบุคคล\nและเครดินิตี้จะพยายามเป็นอย่างยิ่งที่จะให้ท่านได้รับความปลอดภัยสูงสุดในการทำธุรกรรมบนเว็บไซต์ของเครดินิตี้ขอแจ้งให้ทราบถึงนโยบายในการรักษาความลับข้อมูลส่วนบุคคล\nดังต่อไปนี้</p>\n<h2>1. การรวบรวมและการสงวนข้อมูลส่วนบุคคล</h2>\n<p>\n    เครดินิตี้จะทำการเก็บและรวบรวมข้อมูลส่วนบุคคลของท่าน รวมไปถึงแต่ไม่จำกัดเพียงข้อมูลที่ท่านได้ให้ไว้โดยตรง อาทิ ชื่อ-นามสกุล วันเดือนปีเกิด เลขที่บัตรประชาชน ที่อยู่ อีเมล ข้อมูลที่ใช้ในการติดต่อ ข้อมูลทางการเงิน (Financial Data) ข้อมูลเครดิตบูโร (Creditworthiness information) ข้อมูลการลงทุน ตลอดจนกิจกรรมทางธุรกิจ หรือการทำธุรกรรมใดๆ และ/หรือข้อมูลที่ได้รับจากการใช้บริการของท่าน อาทิ ตัวระบุอุปกรณ์ หมายเลข IP ของคอมพิวเตอร์ รหัสประจำตัวอุปกรณ์ ประเภทอุปกรณ์ ข้อมูลเครือข่ายมือถือ ข้อมูลการเชื่อมต่อ ข้อมูลตำแหน่งที่ตั้งทางภูมิศาสตร์ ประเภทของเบราว์เซอร์ (Browser) ข้อมูลบันทึกการเข้าออกเว็บไซต์ ข้อมูลเว็บไซต์ที่ผู้ใช้งานเข้าถึงก่อนและหลัง (Referring Website) ข้อมูลบันทึกประวัติการใช้เว็บไซต์ ข้อมูลบันทึกการเข้าสู่ระบบ (Login Log) ข้อมูลรายการการทำธุรกรรม (Transaction Log) พฤติกรรมการใช้งาน (Customer Behavior) สถิติการเข้าเว็บไซต์ เวลาที่เยี่ยมชมเว็บไซต์ (Access Time) ข้อมูลที่ท่านค้นหา การใช้ฟังก์ชันต่าง ๆ ในเว็บไซต์ และข้อมูลที่เราได้เก็บรวบรวมผ่านคุกกี้หรือเทคโนโลยีอื่นที่คล้ายกันของท่าน จากการที่ท่านได้ทำการสมัครหรือลงทะเบียนผ่านเว็บไซต์ของเครดินิตี้หรือผ่านวิธีการการเปิดบัญชีกับเจ้าหน้าที่ของเครดินิตี้ รวมไปถึงการกรอกแบบฟอร์มการขอเปิดบัญชี ทั้งนี้เครดินิตี้จะทำการเก็บข้อมูลส่วนบุคคลของท่านต่อเมื่อเครดินิตี้ได้รับข้อมูลจากท่านโดยตรง เครดินิตี้จะรักษาข้อมูลเหล่านั้นเป็นความลับตามมาตรฐานสูงที่สุดของเครดินิตี้</p>\n\n<h2>2. การใช้ข้อมูลส่วนบุคคล</h2>\nเครดินิตี้จะนำข้อมูลส่วนบุคคลของท่านไปใช้ดังจุดประสงค์ต่อไปนี้</p>\n<ul>\n    <li>ประเมินและดำเนินการบัญชีของท่านในระหว่างขั้นตอนการสมัครใช้บริการ</li>\n    <li>บริหารจัดการและอำนวยความสะดวกต่อบัญชีของท่าน</li>\n    <li>สื่อสารเรื่องต่างๆในช่องทางใดๆ เช่น การแก้ไขปัญหาในการใช้บริการ</li> \n    <li>สื่อสารข้อมูลเกี่ยวกับผลิตภัณฑ์ หรือการให้บริการเพิ่มเติมใดๆ ที่เครดินิตี้ต้องการเสนอให้แก่ท่าน</li>\n    <li>ประเมินข้อมูลทางการเงิน สถานะทางการเงิน ข้อมูลเครดิตบูโร</li>\n    <li>เพื่อทำการประเมินเครดิตในการออกสินเชื่อ ประเมินวัตถุประสงค์ในการออกสินเชื่อ</li>\n    <li>ตรวจสอบคุณสมบัติและตัวตนของท่านเพื่อให้เป็นไปตามประกาศคณะกรรมการตลาดทุน ทจ.21/2562 อาทิเช่น การทำความรู้จักสมาชิก (KYC) การจัดประเภทสมาชิก รวมถึงการป้องกันการกระทำความผิดตามพระราชบัญญัติป้องกันและปราบปรามการฟอกเงิน พ.ศ.2542 และพระราชบัญญัติป้องกันและปราบปรามการสนับสนุนทางการเงินแก่การก่อการร้ายและการแพร่ขยายอาวุธที่มีอานุภาพทำลายล้างสูง พ.ศ. 2549</li>\n    <li>เปิดเผยข้อมูลตามกฎหมายเพื่อประโยชน์เพื่อประโยชน์ในการสอบสวนหรือพิจารณาคดีตามคำสั่งของหน่วยงานรัฐ หรือกฎหมายที่เกี่ยวข้อง</li>\n    <li>ติดตามทวงหนี้ที่ครบกำหนดชำระตามที่ต้องปฏิบัติที่ระบุไว้ในข้อกําหนดว่าด้วยสิทธิและหน้าที่ของผู้ออกหุ้นกู้และผู้ถือหุ้นกู้</li>\n    <li>เสนอข้อมูลหรือผลิตภัณฑ์หรือบริการอื่นๆที่ท่านอาจให้ความสนใจ</li>\n    <li>ตรวจสอบความถูกต้องแม่นยำของข้อมูลเพื่อพัฒนาโมเดลการประเมินความเสี่ยงของเครดินิตี้</li>\n    <li>พัฒนา และออกแบบเพื่อปรับปรุงผลิตภัณฑ์ และบริการ รวมไปถึงการปฏิบัติงานและกระบวนการทำงานของเครดินิตี้ให้ดียิ่งขึ้น</li>\n    <li>สนับสนุนด้านการบริหารความเสี่ยงด้านต่างๆ ของเครดินิตี้ </li>\n    <li>เพื่อประโยชน์อื่นๆ ตามคำสั่ง กฎหมาย และ/หรือหน่วยงานรัฐใดๆ ที่เกี่ยวข้อง </li>\n</ul>\n\n<h2>3. การเปิดเผยข้อมูลส่วนบุคคล</h2>\n<p>\n    เครดินิตี้จะทำการเก็บรักษาข้อมูลส่วนบุคคลของท่านเป็นความลับ โดยเครดินิตี้จะไม่อนุญาตให้เปิดเผยข้อมูลส่วนบุคคลใดๆ ของท่านนอกจากพนักงานที่ได้รับอนุญาตจากเครดินิตี้ เครดินิตี้ในเครือ และบุคคลที่สามที่ได้รับอนุญาตจากท่านให้เข้าถึงข้อมูลส่วนบุคคลของท่านตลอดจนเครดินิตี้จะทำการป้องการมิให้การนำข้อมูลส่วนบุคคลของท่านไปใช้โดยมิได้รับอนุญาตจากท่านก่อน เว้นแต่</p>\n<ul>\n    <li>เครดินิตี้ได้รับความยินยอมจากท่าน</li>\n    <li>การให้ข้อมูลดังกล่าวเป็นไปเพื่อช่วยให้ท่านสามารถทำธุรกรรมที่ท่านประสงค์</li>\n    <li>การรายงานข้อมูลต่อเครดินิตี้ ข้อมูลเครดิตแห่งชาติ จำกัด (Credit Bureau)ที่เชื่อถือได้หรือหน่วยงานอื่นใดที่คล้ายคลึงกันที่เครดินิตี้มีหน้าที่ต้องรายงานข้อมูล</li>\n    <li>การรายงานข้อมูลต่อสำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (กลต.)</li>\n    <li>การเปิดเผยข้อมูลตามกฎหมาย เพื่อประโยชน์ในการสอบสวนหรือการพิจารณาคดี</li>\n    <li>การเปิดเผยข้อมูลนั้นๆ เป็นไปโดยถูกต้องตามกฎหมาย หรือตามคำสั่งของหน่วยงานของรัฐที่เกี่ยวข้อง </li>\n</ul>\n\n<h2>4. การแก้ไขเปลี่ยนแปลงข้อมูลส่วนบุคคล</h2>\n<p>\n    ท่านสามารถแก้ไขเปลี่ยนแปลงข้อมูลส่วนบุคคลได้ หากท่านต้องการปรับปรุงข้อมูลส่วนบุคคลของท่านให้เป็นปัจจุบันหรือพบข้อผิดพลาดในข้อมูลส่วนบุคคลของท่าน โดยท่านสามารถดำเนินการแจ้งความประสงค์ในการแก้ไขข้อมูลส่วนบุคคลให้แก่ Data officer ทางอีเมล support@peerpower.co.th ในบางกรณี Data Officer อาจทำการร้องขอเอกสารเพิ่มเพื่อยืนยันตัวตนและข้อมูลส่วนบุคคลที่ถูกต้อง \n</p> \n<h2>5. การเพิกถอนการเปิดเผยข้อมูลส่วนบุคคล</h2> \n<p>\n    ท่านสามารถเพิกถอนข้อมูลส่วนบุคคล หรือยกเลิกการเปิดเผยข้อมูลส่วนบุคคลได้ โดยท่านสามารถทำการแจ้งความประสงค์ในการเพิกถอนหรือยกเลิกการเปิดเผยข้อมูลส่วนบุคคลเป็นลายลักษณ์อักษรทางอีเมล support@peerpower.co.th หรือโทรศัพท์ 02-026-3514 ทั้งนี้เมื่อท่านทำการเพิกถอนข้อมูลส่วนบุคคลหรือยกเลิกการเปิดเผยข้อมูลส่วนบุคคลแล้ว ท่านอาจจะไม่ได้รับการบริการตามระดับความพึงพอใจเดิมของท่าน\n</p> \n\n<h2>6. มาตรการการรักษาความลับของข้อมูลส่วนบุคคล</h2>\n<p>\n    ข้อมูลส่วนบุคคลของเครดินิตี้ที่ถูกจัดเก็บบนระบบของ AWS จะถูกจัดเก็บในเซิร์ฟเวอร์มากกว่า 1 เซิร์ฟเวอร์เพื่อทำให้เกิดความมั่นใจว่าข้อมูลจะไม่สูญหาย โดยเครดินิตี้จะทำการสำรองข้อมูลทุกวันเพื่อให้มั่นใจว่าข้อมูลที่ถูกจัดเก็บบนระบบ S3 บน AWS จะไม่ถูกแทนที่หรือสูญหายจากความตั้งใจในการลบข้อมูลของผู้ใช้และการหยุดการทำงานของแอพพลิเคชั่น ซึ่งข้อมูลที่ถูกจัดเก็บบนระบบของ AWS จะถูกเข้ารหัสโดย.................................) โดยใช้เทคโนโลยีการเข้ารหัสแบบ AES-256\n</p> \n\n<h2>7. การแก้ไขนโยบายการรักษาข้อมูลส่วนบุคคล</h2>\n<p>\n    เครดินิตี้ขอเรียนแจ้งให้ท่านทราบว่า เครดินิตี้อาจจะทำการปรับปรุงแก้ไขนโยบายการรักษาข้อมูลส่วนบุคคลอยู่เสมอผ่านทางเว็บไซต์ของเครดินิตี้ โดยท่านสามารถติดตามการปรับปรุงแก้ไขนโยบายการรักษาข้อมูลส่วนบุคคลได้บนเว็บไซต์ของเครดินิตี้</p>';
}
