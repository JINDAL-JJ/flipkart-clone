import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input/index";
import { addProduct } from "../../actions";
import Modal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const Products = (props) => {
    const categoryList = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [show, setShow] = useState(false);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", category);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        dispatch(addProduct(form));
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };

    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0
                        ? product.products.map((product) => (
                              <tr
                                  onClick={() =>
                                      showProductDetailModal(product)
                                  }
                                  key={product._id}
                              >
                                  <td>1</td>
                                  <td>{product.name}</td>
                                  <td>{product.price}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.category.name}</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </Table>
        );
    };

    const renderAddProductModel = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add new Product`}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={`Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Select Category</option>
                    {createCategoryList(categoryList.categories).map(
                        (option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        )
                    )}
                </select>
                {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                          <div key={index}>{pic.name}</div>
                      ))
                    : null}
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleProductPictures}
                />
            </Modal>
        );
    };

    const handleCloseProductDetailModal = () => {
        setProductDetailModal(false);
    };

    const showProductDetailModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
    };

    const renderProductDetailModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailModal}
                modalTitle={`Product details`}
                size="lg"
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((picture) => (
                                <div className="productImageContainer">
                                    <img
                                        src={generatePublicUrl(picture.img)}
                                    ></img>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>{renderProducts()}</Col>
                </Row>
            </Container>
            {renderAddProductModel()};{renderProductDetailModal()};
        </Layout>
    );
};

export default Products;
