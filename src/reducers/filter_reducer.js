import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            let maxPrice = action.payload.map((product) => product.price);
            maxPrice = Math.max(...maxPrice);

            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload],
                filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
            };

        case SET_LISTVIEW:
            return { ...state, grid_view: false };

        case SET_GRIDVIEW:
            return { ...state, grid_view: true };

        case UPDATE_SORT:
            return { ...state, sort: action.payload };

        case SORT_PRODUCTS:
            const { sort, filtered_products } = state;
            let tempProducts = [...filtered_products];

            if (sort === "price-lowest") {
                tempProducts = tempProducts.sort((a, b) => a.price - b.price);
            }
            if (sort === "price-highest") {
                tempProducts = tempProducts.sort((a, b) => b.price - a.price);
            }
            if (sort === "name-a") {
                tempProducts = tempProducts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            }
            if (sort === "name-z") {
                tempProducts = tempProducts.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
            }

            return { ...state, filtered_products: tempProducts };

        case UPDATE_FILTERS:
            const { name, value } = action.payload;
            return { ...state, filters: { ...state.filters, [name]: value } };

        case FILTER_PRODUCTS:
            const { all_products } = state;
            const { text, category, company, color, price, shipping } = state.filters;
            let newProducts = [...all_products];

            // search
            if (text) {
                newProducts = newProducts.filter((product) => product.name.toLowerCase().includes(text));
            }
            // category
            if (category !== "all") {
                newProducts = newProducts.filter((product) => product.category === category);
            }
            // company
            if (company !== "all") {
                newProducts = newProducts.filter((product) => product.company === company);
            }
            // colors
            if (color !== "all") {
                newProducts = newProducts.filter((product) => {
                    return product.colors.find((c) => c === color);
                });
            }
            // price
            newProducts = newProducts.filter((product) => product.price <= price);
            // shipping
            if (shipping) {
                newProducts = newProducts.filter((product) => product.shipping === true);
            }

            return { ...state, filtered_products: newProducts };

        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    company: "all",
                    category: "all",
                    color: "all",
                    price: state.filters.max_price,
                    shipping: false,
                },
            };

        default:
            return state;
    }
};

export default filter_reducer;
