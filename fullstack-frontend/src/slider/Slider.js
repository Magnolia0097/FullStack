import { Slide } from "react-slideshow-image";

import slideImages from "../image/images";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.container} maxWidth="mx">
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          
          return (
            <div className={styles.slide} key={slide}>
              
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
                <h2> ㅎㅇㅎㅇ </h2>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
