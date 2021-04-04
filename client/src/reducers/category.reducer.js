import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null,
};

const buildNewCategory = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: [],
            },
        ];
    }

    for (let cat of categories) {
        if (cat._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: category.children,
            };
            myCategories.push({
                ...cat,
                children:
                    cat.children.length > 0
                        ? [...cat.children, newCategory]
                        : [newCategory],
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children
                    ? buildNewCategory(parentId, cat.children, category)
                    : [],
            });
        }
    }

    return myCategories;
};

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategory = buildNewCategory(
                category.parentId,
                state.categories,
                category
            );
            // console.log(updatedCategory);

            state = {
                ...state,
                categories: updatedCategory,
                loading: false,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...initState,
            };
            break;
    }
    return state;
};
