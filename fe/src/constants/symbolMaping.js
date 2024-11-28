import TTM from "../assets/ttm.png";
import CDSL from "../assets/cdsl.png";
import IRFC from "../assets/irfc.png";
import BSE from "../assets/bse.png";

export const symbolMapping = {
  BTCUSDT: { symbol: "TTM", title: "Tata Motors", logo: TTM },
  ETHUSDT: { symbol: "BSE", title: "Bombay Stock Exchange", logo: BSE },
  BNBUSDT: {
    symbol: "IRFC",
    title: "Indian Rail Finance Corporation",
    logo: IRFC,
  },
  BNBBTC: {
    symbol: "CDSL",
    title: "Central Depository Services(India) Limited",
    logo: CDSL,
  },
};
