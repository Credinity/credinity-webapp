import CredinityFullFooter from "@/components/layouts/CredinityFullFooter";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import PageContainer from "@/components/layouts/PageContainer";
import { setRequestSuccess, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import jsonwebtoken from "jsonwebtoken";
import { useSelector } from "react-redux";
import Image from "next/image";
import ImgDetailCard from "@/components/layouts/ImgDetailCard";
import { Black } from "@/public/constants/color.constant";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import MainPageImg from "../public/img/contents/mainpageImg.png";
import Auction from "../public/img/features/Auction.png";
import AuctionHover from "../public/img/features/AuctionHover.png";
import Auto from "../public/img/features/Auto.png";
import AutoHover from "../public/img/features/AutoHover.png";
import Anyone from "../public/img/features/Anyone.png";
import AnyoneHover from "../public/img/features/AnyoneHover.png";
import ArticleCard from "@/components/layouts/ArticleCard";

type Props = {
  initialCheckToken: boolean;
};

export default function Index({ initialCheckToken }: Props) {
  const user = useSelector(userSelector);
  const [isSignUp, setSignUp]: [boolean, Function] = useState(false);
  const [isContainToken] = useState(initialCheckToken);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routePage = (path: string) => {
    dispatch(setRequestSuccess(true));
    router.push(path);
    dispatch(setRequestSuccess(false));
  };

  const menuArray = isContainToken
    ? [
        { name: "INVESTOR", path: "" },
        { name: "LOAN", path: "" },
        { name: "NEWS", path: "" },
        { name: "ABOUT US", path: "" },
        { name: "PROFILE", path: "" },
      ]
    : [
        { name: "LOG IN", path: "/auth/signIn" },
        { name: "REGISTER", path: "/auth/signUp" },
        { name: "INVESTOR", path: "" },
        { name: "LOAN", path: "" },
        { name: "NEWS", path: "" },
        { name: "ABOUT US", path: "" },
        { name: "PROFILE", path: "" },
      ];
  return (
    <PageContainer
      pageName="Index"
      loading={user.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader menuList={menuArray} />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ px: "20px" }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h1" fontWeight="bold" textAlign="center">
            Credinity, a P2P lending and investment service platform
          </Typography>
          <Box sx={{ my: 2 }}>
            <Image priority src={MainPageImg} alt="Main Photo" />
          </Box>

          <Typography variant="body1" textAlign="start">
            เราเป็นตัวกลางในการทำให้
            ผู้ขอสินเชื่อและผู้ให้สินเชื่อมาพบกันโดยที่มีสินทรัพย์ค้ำประกัน
            โดยเราจะเป็นผู้จัดการเอกสาร
            รวมถึงรองรับความเสี่ยงของสินเชื่อให้กับผู้ให้สินเชื่อ
            สนใจร่วมเป็นส่วนหนึ่งของเรา
          </Typography>
        </Box>
        {isContainToken ? null : (
          <Grid item container>
            {isSignUp ? (
              <Stack alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              <PrimaryButton
                disabled={isSignUp}
                onClick={() => {
                  setSignUp(true);
                  routePage("/auth/signUp");
                  setSignUp(false);
                }}
              >
                สมัครสมาชิกที่นี่
              </PrimaryButton>
            )}
          </Grid>
        )}
        <Box minHeight="15px" />
        <Typography variant="h2">การบริการของเรา</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="auction"
          imgNormal={Auction}
          imgHover={AuctionHover}
          title="Auction"
          detail="บริการประมูลทรัพย์สิน สมาชิกมีสิทธิในการประมูลอสังหาริมทรัพย์โดยเสนอจำนวนเงิน ดอกเบี้ย และค่าธรรมเนียมปากถุง"
        />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="auto exchange"
          imgNormal={Auto}
          imgHover={AutoHover}
          title="Auto"
          detail="บริการอัติโนมัติ สมาชิกสามารถโอนเงินเข้าลงทุนที่บริษัท โดยทางบริษัท Credinity จะทำการขอสินเชื่อกับสมาชิกที่ต้องการปล่อนสินเชื่อ และจะทำการนำเงินไปปล่อยสินเชื่อต่อให้สมาชิก โดยสมาชิกจะได้รับดอกเบี้ย อัติโนมัติ โดยทาง Credinity จะเป็นผู้รับความเสี่ยงให้สมาชิก ในกรณีทรัพย์สินถูกยึด"
        />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="Asset Allocation and Diversification"
          imgNormal={Anyone}
          imgHover={AnyoneHover}
          title="Anyone"
          detail="บริการกระจายความเสี่ยงการปล่อยสินเชื่อ ทางผู้ปล่อยสินเชื่อ กรณีที่มีเงินไม่เพียงพอในการปล่อยสินเชื่อขนาดใหญ่ แต่ต้องการเลือกทรัพย์สินในการค้ำประกันเอง สามารถเลือกสินทรัพย์ที่บริษัทประกาศได้ว่าสินทรัพย์นี้ สามารถร่วมกระจายความเสี่ยงได้ ซึ่งสัญญาจะถูกทำในนามบริษัท เมื่อจำนวนเงินครบตามจำนวน และหากทรัพย์สินถูกยึดจะได้รับเงินคืนเมื่อขายได้เท่านั้น"
        />
        <Box minHeight="15px" />
        <Typography variant="h2">บทความ</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
        <Box minHeight="5px" />
        <ArticleCard
          contentId="1"
          imgContent="img/contents/saveMoney.png"
          altImg="save Money"
          title="กฎการออมเงินให้รวย"
          detail="การมีอิสระภาพทางการนั้นเป็นของผู้ที่มีการควบคุมการเงินของตัวเองได้อย่างดี​ โดยเริ่มจากการออมเงินให้ทุกๆเดือนอย่างน้อย10%ขึ้นไป
 
          1. จ่ายให้ตัวเองก่อนทุกครั้งที่มีรายได้เข้ามาไม่ว่าช่องทางไหนให้เราแบ่ง10%ไว้จ่ายให้เราก่อนเสมอ​ โดยแยกเก็บไว้ในบัญชีที่แยกไว้ชัดเจนไม่แตะต้องหรือใช้เงินส่วนนี้้​ โดยออมในกองทุนไว้ต่างหากในพวกตราสารหนี้ที่มีความเสี่ยงต่ำ​ก็ได้เพื่อให้มีเงินใช้ในอนาคต​หลังจากทำงานไม่ได้แล้ว และส่วนที่เหลืออีก90%เราก็สามารถใช้ได้เจ็มที่ถึงแม้ว่าก่อนหน้านี้ที่เราใช้100%ก็ยังเหมือนว่าไม่พอใช้แต่จริงๆแล้วคนเราสามารถปรับตัวให้เข้ากับสถานการณ์และทรัพยากร​ที่บีบบังคับได้เป็นอย่างดี​ หลังจากนั้นค่อยทยอยเพิ่มสัดส่วนการเก็บออมขึ้นเรื่อยๆ
           
          2. ให้ใช้ประโยชน์​จากการลดหย่อนภาษีอย่างเต็มที่​ ซึ่งภาษีของคนที่ทำงานเป็นพนักงานทั่วไปจะอยู่ตั้งแต่​ 0-35% คิดตามขั้นบันไดรายได้​ หากเราไม่ใช้การลดหย่อนออม​ ลงทุน​ ใช้จ่ายหรือบริจาคเลยจะทำให้เราเสียเงินเพิ่มอีกจากที่เราต้องจ่ายภาษีในการจับจ่ายใช้สอยทั่วไปอยู่แล้ว​ ดังนั้นการลงทุนแบบออมเช่นกองทุน​ SSF​ RMF ก็สามารถนำมาลดหย่อนได้​เป็นต้น
          "
        />
        <Box minHeight="5px" />
        <ArticleCard
          contentId="2"
          imgContent="img/contents/earnMoney.png"
          altImg="earn Money"
          title="จงใช้เวลาพุ่งเป้าไปที่การสร้างเงิน​ ไม่ใช่ใช้เวลาการออมเงิน"
          detail="ต้องใช้เวลาอย่างน้อย95%ในการสร้างเงิน​ และใช้เวลาน้อยกว่า5%ในการออมเงิน
          หลายคนมีทัศนคติและการตั้งคำถามที่แตกต่างกันเรื่องการเงิน​ การที่เราจะหลุดการเป็นหนี้ได้นั้นต้องมีวินัยเรื่องการใช้จ่ายและเก็บออม​ บางคนคิดว่าจะแบ่งเก็บเงินอดออมได้อย่างไรในเมื่อทุกวันนี้เงินที่มีในแต่ละวันก็ไม่พอใช้อยู่แล้ว​ แต่ละเดือนก็ไม่พอใช้แค่เดือนชนเดือนยังยากเลยแล้วจะไปมีเงินเก็บได้อย่างไร​ บางทีคนทีคนที่คิดแบบนี้อาจจะเป็นปัญหาเรื่องการตั้งคำถามในแง่ลบเกินไป​ทำให้ลดทอนกำลังใจ
          แต่ถ้าเป็นเปลี่ยนคำถามใหม่ล่ะว่าปัจจุบันนี้เงินไม่พอใช้และไม่เหลือเก็บ​ แล้วจะทำยังไงให้มีเงินพอใช้และมีเงินเหลือเก็บ​ หากงานในปัจจุบันเงินน้อยไม่พอใช้​ เราสามารถทำงานดสริมอื่นงานที่2งานที่3ช่องทางอื่นๆ​ วิธีไหนที่สามารถมีรายได้เพิ่มได้หรือไม่ทำเราสามารถทำได้​ ลงทุนน้อยหรือไม่ลงทุนเลย​ สิ่งที่เราชอบหรือสนใจอยู่แล้ว​ ซึ่งมีหลายช่องทางหลายวิธีในปัจจุบันให้เลือกตามความชอบและถนัดของแต่ละคน​ น่าจะเป็นการตั้งคำถามที่เป็นแรงกระตุ้นให้เราคิด​ หาช่องทางและวิธีการต่างๆในการสร้างรายได้เพิ่ม​ หากเราเจอช่องทางในการสร้างรายได้เพิ่มขึ้นมากกว่า1ช่องทาง​ มีรายได้มากขึ้น​ ไม่เพิ่มรายจ่ายตาม เคลียหนี้สินที่มีอยู่​ สุดท้ายจึงค่อยแบ่งเงินเก็บออมได้มากตามไปด้วย"
        />
        <Box minHeight="5px" />
        <ArticleCard
          contentId="3"
          imgContent="img/contents/advisor.png"
          altImg="advisor."
          title="คำแนะนำทางการเงิน"
          detail="1. คิดให้รอบคอบที่เกี่ยวกับเรื่องเงิน​ ทั้งการใช้ ซื้อ​ จ่าย​ ให้​ หา​ ยืม​ กู้​ หา​ ลงทุนหรืออื่นๆที่มีเรื่องเงินเข้ามาเกี่ยวข้องอย่างรอบด้านและระมัดระวังในมิติอื่นๆด้วย​ เช่น​ หากจะซื้อบ้านนอกจากจะดูเรื่องราคากับพื้นที่แล้ว​ ต้องพิจารณาเรื่อง​ จุดประสงค์​การซื้อ ใครอยู่​ ทำเลในเมืองหรือนอกเมือง​ การเดินทาง​สะดวกไหม​ ตอนเช้าและเย็นมีไฟทางหรือเปลี่ยวไหม​ เพื่อนบ้านเป็นยังไง ใกล้ชุมชนหรือสลัมไหม​ เป็นต้น
          2. ให้สร้างรายได้ก่อนสร้างหนี้​ หากเราสร้างหนี้ก่อนสร้างรายได้เมื่อเราเป็นหนี้คนอื่นเงินที่หาได้ก็จะต้องเอาไปจ่ายให้คนอื่นก่อนจ่ายให้ตัวเอง​ยกเว้นหนี้นั้นเป็นหนี้ที่ดี
          3. เงินซื้อความสุขได้จริงหรือไม่​และความสุขที่ได้เป็นความสุขชั่วคราวหรือความสุขยั่งยืน​ เช่น​ เงินสามารถซื้อเตียงใหญ่นุ่มๆได้แต่ไม่สามารถซื้อการหลับสนิทได้​ เงินสามารถซื้อเพื่อนเที่ยวได้แต่ไม่สามารถซื้อความสัมพันธ์​ของมิตรแท้ได้​ เงินสามารถซื้อรถหรูบ้านใหญ่อาหารดีๆได้แต่ไม่สามารถซื้อสุขภาพและเวลาได้
          4. รู้จักอดเปรี้ยวไว้กินหวาน​ อดทนที่จะไม่ใช้จ่ายฟุ่มเฟือยเก็บเงินไว้ในวันนี้ดีกว่าเสียโอกาสเอาเงินไปลงทุนเพื่อให้เงินงอกเงยในอนาคต
          5.อย่ากลัวที่จะใช้เงิน​ เราสามารถประหยัดโดยการจ่ายเงินในสิ่งที่สมควรจ่ายและเหมาะสมดีกว่าการเก็บเงินไว้เฉยๆในธนาคาร เช่น​ การจ่ายเงินซื้อกองทุน​SSF/RMF​ จ่ายเงินบริจาคทางการศึกษา​ จ่ายเงินซื้อประกันสุขภาพ​ จ่ายเงินซื้อคอนโดหรือบ้านให้เช่าเพื่อใช้ในการลดหย่อนภาษี​ หรือการซื้อหุ้นหรือร่วมลงทุนบริษัทที่จะทำให้เงินงอกเงยได้ในอนาคตเป็นต้น
          6. ควรเรียนรู้จากผู้ที่มีประสบการณ์​จริง​ เพราะหากเราเรียนรู้จากคนที่เรียนรู้และสอนเฉพาะในตำราอย่างเดียวคำแนะนำอาจจะไม่ได้ผลอย่างที่เราอยากได้เพราะสถานการณ์​จริงจะมีปัจจัย​แวดล้อมอื่นๆประกอบทำให้ไม่สามารถแก้ไขหรือป้องกันปัญหาได้ตรงตามตำราเสมอไป
          7.​ ไม่มีใครรู้ไปทุกเรื่อง​ Mr./Ms KNOW IT ALL เพราะแต่ละคนจะมีความรู้​ ความสามารถ​ ความสนใจ​ ความเชี่ยวชาญ​ ประสบการณ์​ชีวิตที่แตกต่างกัน​ ดังนั้น​ การทำบางอย่างในสิ่งเดียวกันผลที่ได้อาจจะแตกต่างกันได้
          "
        />
        <Box minHeight="15px" />
      </Stack>

      <CredinityFullFooter />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  console.log("index", { jwt });
  if (jwt) {
    return {
      props: {
        initialCheckToken: [true],
      },
    };
  } else {
    return {
      props: {
        initialCheckToken: [false],
      },
    };
  }
};
