import ArticleCardGroupView from "@/components/displays/Carousel/ArticleCardGroupView";
import { articleBanner } from "@/models/constants/content.constant";
import Carousel from "react-material-ui-carousel";

//Todo: Add service get article
export default function ArticleCarouselView() {
  return (
    <>
      <Carousel
        navButtonsAlwaysVisible={false}
        navButtonsAlwaysInvisible={false}
        cycleNavigation={true}
        swipe={true}
        autoPlay={true}
        indicators={true}
        fullHeightHover={true}
        animation="slide"
        duration={500}
      >
        {articleBanner.map((item, i) => (
          <ArticleCardGroupView key={i} items={item} />
        ))}
      </Carousel>
    </>
  );
}
