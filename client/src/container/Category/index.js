import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategorieAction,
} from "../../actions";
import Input from "../../components/UI/Input/index";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDown,
    IoIosArrowForward,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

function Category() {
    const categoryList = useSelector((state) => state.category);

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();

        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImage", categoryImage);
        dispatch(addCategory(form));

        setCategoryName("");
        setParentCategoryId("");

        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }
        // console.log(cat);

        setShow(false);
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children:
                        category.children.length > 0 &&
                        renderCategories(category.children),
                }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (
                //         <ul>{renderCategories(category.children)}</ul>
                //     ) : null}
                // </li>
            );
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const updateCategory = () => {
        updateCheckedAndExpandedCategory();
        setUpdateCategoryModal(true);
    };

    const updateCheckedAndExpandedCategory = () => {
        const categories = createCategoryList(categoryList.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 &&
            checked.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, index) => categoryId == category.value
                );
                category && checkedArray.push(category);
            });
        expanded.length > 0 &&
            expanded.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, index) => categoryId == category.value
                );
                category && expandedArray.push(category);
            });

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        // console.log(checked, expanded, categories, checkedArray, expandedArray);
    };

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setExpandedArray(updatedExpandedArray);
        }
    };

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        });
        dispatch(updateCategories(form)).then((result) => {
            dispatch(getAllCategory());
        });

        setUpdateCategoryModal(false);
    };

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={`Update Categories`}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {expandedArray.length > 0 &&
                    expandedArray.map((item, index) => (
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) =>
                                        handleCategoryInput(
                                            "name",
                                            e.target.value,
                                            index,
                                            "expanded"
                                        )
                                    }
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) =>
                                        handleCategoryInput(
                                            "parentId",
                                            e.target.value,
                                            index,
                                            "expanded"
                                        )
                                    }
                                >
                                    <option>Select Category</option>
                                    {createCategoryList(
                                        categoryList.categories
                                    ).map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select type</option>
                                    <option value="store">store</option>
                                    <option value="product">product</option>
                                    <option value="page">page</option>
                                </select>
                            </Col>
                        </Row>
                    ))}

                <h6>Checked</h6>
                {checkedArray.length > 0 &&
                    checkedArray.map((item, index) => (
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) =>
                                        handleCategoryInput(
                                            "name",
                                            e.target.value,
                                            index,
                                            "checked"
                                        )
                                    }
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) =>
                                        handleCategoryInput(
                                            "parentId",
                                            e.target.value,
                                            index,
                                            "checked"
                                        )
                                    }
                                >
                                    <option>Select Category</option>
                                    {createCategoryList(
                                        categoryList.categories
                                    ).map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select type</option>
                                    <option value="store">store</option>
                                    <option value="product">product</option>
                                    <option value="page">page</option>
                                </select>
                            </Col>
                        </Row>
                    ))}

                {/* <input
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryImage}
                ></input> */}
            </Modal>
        );
    };

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add new Category`}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
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
                <input
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryImage}
                ></input>
            </Modal>
        );
    };

    const deleteCategory = () => {
        updateCheckedAndExpandedCategory();
        setDeleteCategoryModal(true);
    };

    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, index) => ({
            _id: item.value,
        }));
        const expandedIdArray = expandedArray.map((item, index) => ({
            _id: item.value,
        }));

        const idsArray = expandedIdArray.concat(checkedIdArray);
        dispatch(deleteCategorieAction(idsArray)).then((result) => {
            if (result) {
                dispatch(getAllCategory());
                setDeleteCategoryModal(false);
            }
        });
    };

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: "No",
                        color: "primary",
                        onClick: () => {
                            alert("no");
                        },
                    },
                    {
                        label: "Yes",
                        color: "danger",
                        onClick: () => deleteCategories(),
                    },
                ]}
            >
                <h5>Expanded</h5>
                {expandedArray.map((item, index) => (
                    <div>
                        <span key={index}>{item.name}</span>
                    </div>
                ))}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => (
                    <div>
                        <span key={index}>{item.name}</span>
                    </div>
                ))}
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
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>{renderCategories(categoryList.categories)}</ul> */}
                        <CheckboxTree
                            nodes={renderCategories(categoryList.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={deleteCategory}>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}
        </Layout>
    );
}

export default Category;
