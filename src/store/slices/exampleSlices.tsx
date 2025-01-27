import { Bills, registerConfig } from "@/pages/Register";
import { loadInitialState } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define types for the state
export interface App {
  register: registerConfig[],
}



/* export interface ExampleState {
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
  toPrintItems: Product[]; // Define the shape of your print items
  ailes: Aile[];
  shelves: Shelf[];
  isSubmitted: boolean;
} */

const defaultAppState: App = {
  register: [{
    date: '1-22-2025',
    startingBalance: 0,
    bills: [
      {
        id: 'penny',
        name: 'Penny',
        value: 0.01,
        quantity: 6
      },
      {
        id: 'nickel',
        name: 'Nickel',
        value: 0.05,
        quantity: 6
      },
      {
        id: 'dime',
        name: 'Dime',
        value: 0.1,
        quantity: 7
      },
      {
        id: 'quarter',
        name: 'Quarter',
        value: 0.25,
        quantity: 7
      },
      {
        id: 'half_dollar',
        name: 'Half Dollar',
        value: 0.5,
        quantity: 32
      },
      {
        id: 'one_dollar',
        name: 'One Dollar',
        value: 1,
        quantity: 10
      },
      {
        id: 'five_dollars',
        name: 'Five Dollars',
        value: 5,
        quantity: 8
      },
      {
        id: 'ten_dollars',
        name: 'Ten Dollars',
        value: 10,
        quantity: 8
      },
      {
        id: 'twenty_dollars',
        name: 'Twenty Dollars',
        value: 20,
        quantity: 6
      },
      {
        id: 'fifty_dollars',
        name: 'Fifty Dollars',
        value: 50,
        quantity: 5
      },
      {
        id: 'hundred_dollars',
        name: 'Hundred Dollars',
        value: 100,
        quantity: 6
      }
    ],
    expectedDeposit: 2000,
    grossSale: 1000000,
    scratcher: 20000
  },
  {
    date: '1-23-2025',
    startingBalance: 0,
    bills: [
      {
        id: 'penny',
        name: 'Penny',
        value: 0.01,
        quantity: 0
      },
      {
        id: 'nickel',
        name: 'Nickel',
        value: 0.05,
        quantity: 0
      },
      {
        id: 'dime',
        name: 'Dime',
        value: 0.1,
        quantity: 0
      },
      {
        id: 'quarter',
        name: 'Quarter',
        value: 0.25,
        quantity: 0
      },
      {
        id: 'half_dollar',
        name: 'Half Dollar',
        value: 0.5,
        quantity: 32
      },
      {
        id: 'one_dollar',
        name: 'One Dollar',
        value: 1,
        quantity: 0
      },
      {
        id: 'five_dollars',
        name: 'Five Dollars',
        value: 5,
        quantity: 0
      },
      {
        id: 'ten_dollars',
        name: 'Ten Dollars',
        value: 10,
        quantity: 0
      },
      {
        id: 'twenty_dollars',
        name: 'Twenty Dollars',
        value: 20,
        quantity: 0
      },
      {
        id: 'fifty_dollars',
        name: 'Fifty Dollars',
        value: 50,
        quantity: 0
      },
      {
        id: 'hundred_dollars',
        name: 'Hundred Dollars',
        value: 100,
        quantity: 0
      }
    ],
    expectedDeposit: 0,
    grossSale: 1000000,
    scratcher: 0
  },{
    date: '1-26-2025',
    startingBalance: 0,
    bills: [
      {
        id: 'penny',
        name: 'Penny',
        value: 0.01,
        quantity: 0
      },
      {
        id: 'nickel',
        name: 'Nickel',
        value: 0.05,
        quantity: 0
      },
      {
        id: 'dime',
        name: 'Dime',
        value: 0.1,
        quantity: 0
      },
      {
        id: 'quarter',
        name: 'Quarter',
        value: 0.25,
        quantity: 0
      },
      {
        id: 'half_dollar',
        name: 'Half Dollar',
        value: 0.5,
        quantity: 32
      },
      {
        id: 'one_dollar',
        name: 'One Dollar',
        value: 1,
        quantity: 0
      },
      {
        id: 'five_dollars',
        name: 'Five Dollars',
        value: 5,
        quantity: 0
      },
      {
        id: 'ten_dollars',
        name: 'Ten Dollars',
        value: 10,
        quantity: 0
      },
      {
        id: 'twenty_dollars',
        name: 'Twenty Dollars',
        value: 20,
        quantity: 0
      },
      {
        id: 'fifty_dollars',
        name: 'Fifty Dollars',
        value: 50,
        quantity: 0
      },
      {
        id: 'hundred_dollars',
        name: 'Hundred Dollars',
        value: 100,
        quantity: 0
      }
    ],
    expectedDeposit: 0,
    grossSale: 0,
    scratcher: 0
  }]
}


// Load the state from localStorage or fall back to defaultState
const initialState: App = loadInitialState(
  "register",
  defaultAppState
);

const exampleSlice = createSlice({
  name: "App",
  initialState,
  reducers: {

    updateRegisterData: (state, action) => {
      const { date, startingBalance, bills, expectedDeposit, grossSale, scratcher } = action.payload;
    
      // Check if a register entry for the date already exists
      const existingIndex = state.register.findIndex((entry) => entry.date === date);
    
      if (existingIndex !== -1) {
        // If an entry already exists for this date, update it
        state.register[existingIndex] = {
          date,
          startingBalance,
          bills,
          expectedDeposit,
          grossSale,
          scratcher,
        };
      } else {
        // If no entry exists, add a new one
        state.register.push({
          date,
          startingBalance,
          bills,
          expectedDeposit,
          grossSale,
          scratcher,
        });
      }
    },
    /* // Updates the products list
    updateProduct: (state, action) => {
      state.products = [ ...state.products, ...action.payload ];
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
        isSubmitted,
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
      if (isSubmitted) state.isSubmitted = isSubmitted;
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

    // Adds a new item to the `toPrintItems` list given the sku and shelf id.
    addToPrintItem: (state, action) => {
      const { sku, shelf_id } = action.payload;

      // Filter the product that matches the given SKU and shelf ID
      const matchedProduct = state.products.find((product) => {
        console.log(product[state.whichCQR]);
        return product[state.whichCQR] === sku;
      });

      if (matchedProduct) {
        // Push to `toPrintItems` if the product matches and is not already in the list
        const isAlreadyAdded = state.toPrintItems.some(
          (item) => item.sku === matchedProduct[state.whichCQR] && item.shelf_id === shelf_id
        );

        if (!isAlreadyAdded) {
          state.toPrintItems.push({
            id: Date.now().toString(),
            name: matchedProduct[state.whichCName],
            price: matchedProduct[state.whichCPrice],
            sku: matchedProduct[state.whichCQR],
            size: matchedProduct[state.whichCSize],
            shelf_id,
          });
          toast.success("Item added to print list.");
          console.log("Item added to print list:", matchedProduct);
        } else {
          toast.success("Item already exists in the print list.");
          console.log("Item already exists in the print list:", matchedProduct);
        }
      } else {
        toast.error(
          `No product found with SKU: ${sku} and shelf ID: ${shelf_id}`
        );
        console.error(
          `No product found with SKU: ${sku} and shelf ID: ${shelf_id}`
        );
      }
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
    }, */
  },
});

export const {
  /* updateProduct,
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
  clearToPrintItems, */
  updateRegisterData
} = exampleSlice.actions;

// Selectors
export const selectToday = (state: { example: App }) => {
  const register = state.example.register.find((day) => day.date === new Date().toLocaleDateString().replace(/\//g, "-"));
  return register === undefined ?  { date: "", startingBalance: 0, bills: Bills, expectedDeposit: 0, grossSale: 0, scratcher: 0 } : register;
};

export const selectRegisterData = (state: {example: App}) => {
  return state.example.register;
}

/*export const selectState = (state: {example: ExampleState}) => (state.example) */

export default exampleSlice.reducer;
