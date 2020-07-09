import { useCartContext } from "@magento/peregrine/lib/context/cart";
import { trackEvents } from "../tracker";
export default function trackProductFullDetail(orig) {
  return function useProductFullDetail(props) {
    const api = orig(props);
    const [cart] = useCartContext();
    return {
      ...api,
      handleAddToCart(...args) {
        trackEvents([
          "trackStructEvent",
          "shopping-cart",
          "view",
          null,
          null,
          cart.cartId,
          null,
        ]);
        return api.handleAddToCart(...args);
      },
    };
  };
}
