// HomePage.jsx
import Slider from "../public/slider";
import Form from "../public/Form";
import Mape from "../public/Mape";
import Footer from "../public/footer";
import CommentSlider from "../public/CommentSlider";
import Dish from "../service/Dish";

export default function HomePage() {
  return (
    <>
      <Slider />
      <Dish />
      <Form />
      <CommentSlider />
      <Mape />
      <Footer />
    </>
  );
}
