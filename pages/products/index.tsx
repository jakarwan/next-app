import { useEffect, useState, useReducer } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Head from "next/head";
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Input from "@mui/material/Input";
import axiosConfig from "../../axiosConfig";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion"
import {
  numberWithCommas,
  disCountPrice,
  appReducer,
  value,
  AppState,
} from "../../helpers/helpers";
import Rating from "@mui/material/Rating";

interface RootProduct {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Product {
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Products() {
  const [product, setProduct] = useState<Product[]>([]);

  const [perPage, setPerPage] = useState("10");
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<string>("1");
  // const value: AppState = { loading: true, error: "", data: [] };
  const [state, dispatch] = useReducer(appReducer, value);

  // async function getData() {
  //   const res = await fetch(`https://dummyjson.com/products?limit=${perPage}`);
  //   const data = await res.json();
  //   // console.log(data.products)
  //   return data.products;
  // }

  // async function searchData() {
  //   const res = await fetch(
  //     `https://dummyjson.com/products/search?q=${filter}`
  //   );
  //   const data = await res.json();
  //   // console.log(data.products)
  //   return data.products;
  // }

  function getData() {
    axiosConfig
      .get("/products", {
        params: {
          limit: perPage,
        },
      })
      .then((response) => {
        setProduct(response.data.products);
        dispatch({
          type: "SUCCESS",
          payload: response.data,
        });
        // console.log(response);
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          error: error.response.message,
        });
        console.log(error);
      });
  }

  function searchData() {
    axiosConfig
      .get("/products/search", {
        params: {
          q: filter,
        },
      })
      .then((response) => {
        setProduct(response.data.products);
        dispatch({
          type: "SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          error: error.response.message,
        });
      });
  }

  function getCategory() {
    axiosConfig
      .get("/products/categories", {})
      .then((response) => {
        if (category === null) {
          setCategory(response.data);
        }
        dispatch({
          type: "SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          error: error.response.message,
        });
      });
  }

  function searchCategory() {
    axiosConfig
      .get(`/products/category/${selected}`, {})
      .then((response) => {
        setProduct(response.data.products);
        dispatch({
          type: "SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          error: error.response.message,
        });
      });
  }

  useEffect(() => {
    searchCategory();
  }, [selected]);

  useEffect(() => {
    if (filter.length >= 1) {
      searchData();
    } else {
      getData();
    }
    // searchData();
  }, [filter]);

  useEffect(() => {
    // getData();
    getData();
    getCategory();
    // const product = async () => {
    // setProduct(await getData());
    // };
    // product();
  }, [perPage]);

  // useEffect(() => {
  //   // getData();
  //   const getProduct = async () => {
  //     setProduct(await searchData());

  //   };
  //   getProduct();
  // }, [filter]);

  const handleChange = (event: SelectChangeEvent) => {
    setPerPage(event.target.value as string);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);

    // if (selected === "1") {
    //   getData();
    //   console.log('if')
    // } else {
    //   searchCategory();
    //   console.log('else')
    // }
  };

  const handleSearchChange = async (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    setSelected("1");
    // fetch(`https://dummyjson.com/products/search?q=${filter}`).then(res => res.json()).then((res:any) => setProduct(res.products))
    // setProduct(await searchData());
    // if (event.target.value.length >= 1) {
    //   searchData();
    // } else {
    //   getData();
    // }
    // console.log(event.target.value);
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
            <title>สินค้าทั้งหมด</title>
          </Head>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mt-4">
              <Typography variant="h4" color="text.secondary" sx={{ padding: 2 }}>
                สินค้าทั้งหมด
                <Chip label={product.length} variant="outlined" />
              </Typography>
            </div>
            <div className="m-4">
              <Typography
                variant="h6"
                color="text.secondary"
                id="demo-simple-select-label"
              >
                แสดง
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage}
                label="perPage"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              {/* <InputLabel id="demo-simple-select-label">ประเภท</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="perPage"
                onChange={handleChangeCategory}
              >
                <MenuItem value={"1"}>ทั้งหมด</MenuItem>
                {category?.map((item: string, index: number) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
                {/* {category.map((item: string, index: number) => {
              <MenuItem value={89} key={index}>
                {item}
              </MenuItem>;
            })} */}
              </Select>
              <input
                className="input-form float-right"
                type="text"
                placeholder="Search"
                onChange={(event) => handleSearchChange(event)}
                value={filter}
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-4 m-4"> */}

            <Grid container spacing={0} sx={{ marginTop: 0 }}>
              {product?.map((product: Product, index: number) => (
                // <div
                //   key={index}
                //   className="text-center h-full flex flex-col justify-between"
                // >
                <Grid item sm={6} md={4} xs={12} key={index} sx={{ padding: 2 }}>
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                        padding: 1,
                        ":hover": {
                          boxShadow: 20,
                        },
                      }}
                    >
                      <CardHeader
                        // avatar={
                        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        //     R
                        //   </Avatar>
                        // }
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        sx={{ textAlign: "center" }}
                        title={product.title}
                      // subheader="September 14, 2016"
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={product.thumbnail}
                        alt="Paella dish"
                      />
                      {/* <div className="flex flex-col w-full h-full justify-between"> */}
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          component={"div"}
                          variant="body2"
                          color="text.secondary"
                        >
                          {product.description}
                        </Typography>
                        <Typography
                          component={"div"}
                          variant="h5"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2,
                          }}
                        >
                          {disCountPrice(product.price, product.discountPercentage)}
                          $
                        </Typography>
                        <Typography
                          component={"div"}
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2,
                          }}
                        >
                          <span className="discount-box">
                            {numberWithCommas(product.price)}$
                          </span>
                        </Typography>
                        <Grid
                          display="flex"
                          justifyContent="center"
                          sx={{ marginTop: 2, marginBottom: 2 }}
                        >
                          <Rating
                            name="read-only"
                            value={product.rating}
                            readOnly
                          />
                        </Grid>
                        <div className="flex w-full justify-center mt-3">
                          <Link href={`products/${product.id}`}>
                            <Button variant="outlined" color="error">
                              Buy
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                      {/* </div> */}
                    </Card>
                  </motion.div>
                  {/* <span>{product.brand}</span>
            <Link href={`products/${product.id}`}>
              <Image
                src={product.thumbnail}
                alt="logo"
                width="0"
                priority={true}
                height="0"
                sizes="100vw"
                className="w-full h-auto"
              ></Image>
            </Link> */}
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </div>

      )}

      {/* </div> */}
    </>
  );
}
