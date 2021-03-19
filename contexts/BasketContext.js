import 
    React, { 
    useState, 
    createContext, 
    useContext, 
    useEffect 
} from 'react'

const BasketContext = createContext({
    menuItems: [],
    addMenuItems: () => {},
    removeMenuItem: () => {},
    total: 0 
});

export const Basket = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const menuCopy = [...menuItems];
    const [total, setTotal] = useState(0);

    const addMenuItems = (product) => {
        setMenuItems([...menuItems, product]);
    };
    
    const removeMenuItem = (index) => {
        menuCopy.splice(index, 1);
        setMenuItems(menuCopy);
    };

    useEffect(() => {
        const sum = menuItems.reduce((prev, cur) => {
            return prev + cur.price
        }, 0);
        setTotal(sum);
    } , [menuItems]);

    return(
        <BasketContext.Provider value={{menuItems, addMenuItems, removeMenuItem, total}}>
            {children}
        </BasketContext.Provider>
    );
};

export const BasketConsumer = BasketContext.Consumer;

export const useBasket = () => {
    return useContext(BasketContext);
};
