import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getRessouceFetcher } from "../../shared/getRessouceFetcher";

const cartsFetcher = getRessouceFetcher("carts");
const productsFetcher = getRessouceFetcher("products");

const getDbCartItems = async () => {
    const allCartItems = await cartsFetcher.getAll();
    const cartItems = allCartItems.data;
    const fittedCartItems = await fitCartItems(cartItems);
    return fittedCartItems;
};

const fitCartItems = async (cartItems) => {
    console.log("fitCartItems with cartItems", cartItems);
    const productsIds = cartItems.map((item) => item._id);
    if (productsIds.length === 0) return [];
    const products = await productsFetcher.search({ ids: productsIds });
    return cartItems.map((item) => {
        const product = products.data.find((p) => p._id === item.productId);
        return {
            ...product,
            quantity: item.quantity,
        };
    });
};

const getUser = () => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    return user;
};
const updateCartFromDb = async () => {
    const user = getUser();
    if (user && user?.username !== "guest") {
        const cartItems = await getDbCartItems();
        return cartItems;
    }
    return [];
};

const updateStorage = (cartItems) => {
    const user = getUser();
    if (user?.username === "guest") {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
        localStorage.removeItem("cartItems");
        updateDbCartItems(cartItems);
    }
};

const updateDbCartItems = async (cartItems) => {
    // delete cart items
    const user = getUser();
    if (user && user?.username !== "guest") {
        await cartsFetcher.remove({
            query: { field: "userId", value: user?._id },
        });
        // then save cart items
        const dbCartItems = cartItems.map((item) => {
            return {
                productId: item._id,
                quantity: item.quantity,
                userId: user._id,
            };
        });
        console.log("updateDbCartItems");
        cartsFetcher.create({ data: dbCartItems });
    }
};

const getCartItemsFromLocalStorage = async () => {
    const user = getUser();
    if (user && user?.username !== "guest") {
        return await getDbCartItems();
    }
    console.log("getCartItemsFromLocalStorage FOR GUEST");
    const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
    return cartItems;
};

export const updateCart = createAsyncThunk("carts/updateCart", async () => {
    const cartItems = await getCartItemsFromLocalStorage();
    return cartItems;
});

const cartsSlice = createSlice({
    name: "carts",
    initialState: { cartItems: await getCartItemsFromLocalStorage() },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            updateStorage(state.cartItems);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );
            updateStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            updateStorage(state.cartItems);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updateCart.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
    },
});

export const { addToCart, removeFromCart, clearCart } = cartsSlice.actions;
export default cartsSlice.reducer;
