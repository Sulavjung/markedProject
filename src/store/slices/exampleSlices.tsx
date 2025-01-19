import { createSlice } from "@reduxjs/toolkit";

// Define types for the state
export interface Aile {
  id: string;
  name: string;
}

export interface Shelf {
  id: string;
  name: string;
  aile_id: string;
}

interface ExampleState {
  products: any[]; // Define a proper type for your products
  identifierIs: string;
  showIdentifier: boolean;
  showName: boolean;
  showPrice: boolean;
  showSize: boolean;
  whichCName: string;
  whichCPrice: string;
  whichCSize: string;
  whichCQR: string;
  toPrintItems: any[]; // Define the shape of your print items
  ailes: Aile[];
  shelves: Shelf[];
}

const initialState: ExampleState = {
  products: [], // Array of product objects
  identifierIs: "", // Stores which QR code is active or being used
  showIdentifier: true, // Fixed typo in variable name
  showName: true,
  showPrice: true,
  showSize: true,
  whichCName: "", // Stores the name of the category
  whichCPrice: "", // Stores the price of the category
  whichCSize: "", // Stores the size of the category
  whichCQR: "", // Stores the QR code of the category
  toPrintItems: [], // Array of items to print, each containing product_id and shelves_id
  ailes: [{ id: "1", name: "Aile 1" }], // Array of aisles, each containing aisle_id and name
  shelves: [{ id: "1", name: "1st", aile_id: "1" }], // Array of shelves, each containing shelves_id, name, and aisle_id
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    // Updates the products list
    updateProduct: (state, action) => {
      state.products = { ...state.products, ...action.payload };
    },

    updateSetting: (state, action) => {
      console.log("updateSetting", action.payload);

      // Destructure relevant fields from the payload
      const {
        identifierIs,
        showIdentifier,
        showName,
        showPrice,
        showSize,
        whichCName,
        whichCPrice,
        whichCSize,
        whichCQR,
      } = action.payload;

      // Update the corresponding state properties
      if (identifierIs !== undefined) state.identifierIs = identifierIs;
      if (showIdentifier !== undefined) state.showIdentifier = showIdentifier;
      if (showName !== undefined) state.showName = showName;
      if (showPrice !== undefined) state.showPrice = showPrice;
      if (showSize !== undefined) state.showSize = showSize;
      if (whichCName !== undefined) state.whichCName = whichCName;
      if (whichCPrice !== undefined) state.whichCPrice = whichCPrice;
      if (whichCSize !== undefined) state.whichCSize = whichCSize;
      if (whichCQR !== undefined) state.whichCQR = whichCQR;
    },

    // Toggles the visibility of identifiers
    toggleIdentifier: (state) => {
      state.showIdentifier = !state.showIdentifier;
    },

    // Toggles the visibility of the product name
    toggleShowName: (state) => {
      state.showName = !state.showName;
    },

    // Toggles the visibility of the product price
    toggleShowPrice: (state) => {
      state.showPrice = !state.showPrice;
    },

    // Toggles the visibility of the product size
    toggleShowSize: (state) => {
      state.showSize = !state.showSize;
    },

    // Sets the current category name
    setWhichCName: (state, action) => {
      state.whichCName = action.payload;
    },

    // Sets the current category price
    setWhichCPrice: (state, action) => {
      state.whichCPrice = action.payload;
    },

    // Sets the current category size
    setWhichCSize: (state, action) => {
      state.whichCSize = action.payload;
    },

    // Adds a new item to the `toPrintItems` list
    addToPrintItem: (state, action) => {
      state.toPrintItems.push(action.payload); // Payload should include `product_id` and `shelves_id`
    },

    // Updates the list of aisles
    updateAiles: (state, action) => {
      state.ailes = action.payload; // Payload should be an array of aisle objects
    },

    //Add ailes.
    addAile: (state, action) => {
      state.ailes.push(action.payload);
    },

    // Updates the list of shelves
    updateShelves: (state, action) => {
      state.shelves = action.payload; // Payload should be an array of shelf objects
    },

    //Add shelf
    addShelf: (state, action) => {
      state.shelves.push(action.payload);
    },

    //delete shelf
    deleteShelf: (state, action) => {
      state.shelves = state.shelves.filter(
        (shelf) => shelf.id !== action.payload
      );
    },

    // Clears all items from the `toPrintItems` list
    clearToPrintItems: (state) => {
      state.toPrintItems = [];
    },
  },
});

export const {
  updateProduct,
  updateSetting,
  toggleIdentifier,
  toggleShowName,
  toggleShowPrice,
  toggleShowSize,
  setWhichCName,
  setWhichCPrice,
  setWhichCSize,
  addToPrintItem,
  updateAiles,
  addAile,
  updateShelves,
  addShelf,
  deleteShelf,
  clearToPrintItems,
} = exampleSlice.actions;

// Selectors
export const selectAiles = (state: { example: ExampleState }) =>
  state.example.ailes;
export const selectShelves = (state: { example: ExampleState }) =>
  state.example.shelves;

export default exampleSlice.reducer;
