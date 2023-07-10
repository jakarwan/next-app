import { useRouter } from "next/router";
import React, { useEffect, useState, useReducer, useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import { motion } from "framer-motion"
import {
  numberWithCommas,
  disCountPrice,
  appReducer,
  value,
  AppState,
} from "../../helpers/helpers";

interface Detail {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// interface AppState {
//   loading: Boolean;
//   error: string;
//   data: any;
// }
// interface AppActions {
//   type: string;
//   payload?: any;
//   error?: string;
// }

// const value: AppState = { loading: true, error: "", data: [] };

function ProductId() {
  const router = useRouter();
  const { id } = router.query;

  async function getData() {
    const res = await fetch(`https://dummyjson.com/product/${id}`);
    const data = await res.json();
    // console.log(data.products)
    return data;
  }

  // function appReducer(state: AppState, action: AppActions): AppState {
  //   switch (action.type) {
  //     case "SUCCESS":
  //       return {
  //         loading: false,
  //         data: action.payload,
  //         error: "",
  //       };
  //     case "ERROR":
  //       return {
  //         loading: false,
  //         error: action.error ? action.error : "error",
  //         data: [],
  //       };
  //     default:
  //       return state;
  //   }
  // }

  useEffect(() => {
    // const detail = async () => {
    //   setDetail(await getData());
    // };
    let imgLightBox: { src: string; title: string }[] | any = [];
    if (id) {
      const detail = async () => {
        try {
          const response = await getData();
          // console.log(response.images);
          setDetail(response);
          setImages(response.images);
          const createLightBox = () => {
            if (response) {
              response?.images.forEach((item: any, index: number) =>
                imgLightBox?.push({
                  src: item,
                  // title: item.name
                })
              );
              setLightBox(imgLightBox);
            }
          };
          createLightBox();
          // setLightBox(response.images);
          // setIsLoading(false);
          dispatch({
            type: "SUCCESS",
            payload: response,
          });
        } catch (e: any) {
          dispatch({
            type: "ERROR",
            error: e.message,
          });
        }
      };
      detail();
    }
  }, [id]);
  const [detail, setDetail] = useState<Detail>();
  const [imgs, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [lightBox, setLightBox] = useState<[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [clickImage, setClickImage] = useState(null);
  // const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [state, dispatch] = useReducer(appReducer, value);

  // function numberWithCommas(x: number) {
  //   return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  // function disCountPrice(price: number, discount: number) {
  //   let dis = 0;
  //   let totalprice = 0;
  //   dis = (price * discount) / 100;
  //   totalprice = price - dis;
  //   return numberWithCommas(totalprice);
  // }
  const box = useRef<(HTMLImageElement | null)[]>([]);
  console.log(box.current);
  const handelClick = (index: number) => {
    // setClickImage(index);
    // setLightBox(item);
    setCurrentIndex(index);
    // if (box.current[index] === index) {
    // box.current[index]?.classList.toggle("active");
    // }

    // let box: HTMLImageElement | null = null;
    // if (box) {
    //   box = document.getElementById(`boxImg${index}`);
    //   box.classList.add("active");
    // }

    // setOpen(true);
  };
  return (
    <>
      {state.loading ? (
        "loading"
      ) : state.error ? (
        <div>{state.error}</div>
      ) : (
        <div>
          <Head>
            <title>{state.data.brand} - {state.data.title}</title>
          </Head>
          {/* สินค้า : {id} */}
          {/* <Typography
            variant="h4"
            color="text.secondary"
            sx={{ padding: 2, textAlign: "center" }}
          >
            สินค้า : {state.data.title}
          </Typography> */}
          {/* <div className="text-center">{state.data.brand}</div> */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={0} sx={{ padding: 3 }}>
              <Grid item xs={12} sm={4} md={3} lg={3} sx={{ height: "50%" }}>
                <ImageList
                  sx={{ width: 200, height: 400 }}
                  cols={1}
                  rowHeight={164}
                  className="img-box-m"
                >
                  {state.data.images?.map((item: string, index: number) => (
                    <ImageListItem key={index}>
                      {/* <picture> */}
                      <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <img
                          src={item}
                          alt={item}
                          loading="lazy"
                          className={
                            currentIndex === index ? "img-box active" : "img-box"
                          }
                          // ref={(el) => (box.current[index] = el)}
                          onClick={() => handelClick(index)}
                        />
                      </motion.div>
                      {/* </picture> */}
                      {/* <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  index={currentIndex}
                  slides={lightBox}
                /> */}
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={6}>
                <img
                  src={state.data.images[currentIndex]}
                  className="img-showcase"
                  alt=""
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Typography
                  component={'div'}
                  color="text.secondary"
                  sx={{ marginLeft: 1, marginRight: 1 }}
                >
                  <Typography
                    component={'span'}
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 22 }}
                  >
                    {state.data.brand}
                  </Typography>
                  <Typography
                    component={'div'}
                    color="text.secondary"
                    sx={{ fontSize: 18 }}
                  >
                    {state.data.title}
                  </Typography>
                  <div>ประเภทสินค้า: {state.data.category}</div>
                  <Typography
                    component={'span'}
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: 20 }}
                  >
                    {disCountPrice(
                      state.data.price,
                      state.data.discountPercentage
                    )}
                    $
                    <Typography className="discount-font" component={'span'}>
                      {numberWithCommas(state.data.price)}$
                    </Typography>
                  </Typography>
                  <div>In Stock: {state.data.stock}</div>
                  <div>
                    <Rating name="read-only" value={state.data.rating} readOnly />
                  </div>
                  <div>Description: {state.data.description}</div>
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
          {/* <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              padding: 1,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            
          </Card> */}
          {/* <Typography variant="h6" color="text.secondary" sx={{ padding: 2 }}>
            {state.data.brand}
          </Typography> */}
          {/* <div>{state.data.brand}</div> */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={currentIndex}
            slides={lightBox}
          />
        </div>
      )}
    </>
  );
}

export default ProductId;
