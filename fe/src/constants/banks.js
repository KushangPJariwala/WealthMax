import ICICI from "../assets/icici.png";
import SBI from "../assets/sbi.png";
import HDFC from "../assets/hdfc.png";
import AXIS from "../assets/axis.png";
import BOB from "../assets/bob.png";

export const banks = [
  {
    value: "icici",
    label: "ICICI BANK LIMITED",
  },
  {
    value: "bob",
    label: "BANK OF BARODA",
  },

  {
    value: "sbi",
    label: "STATE BANK OF INDIA",
  },
  {
    value: "axis",
    label: "AXIS BANK LIMITED",
  },
  {
    value: "hdfc",
    label: "HDFC BANK LIMITED",
  },
];

export const bankMapping = {
  icici: { symbol: "ICICI", title: "ICICI BANK LIMITED", logo: ICICI },
  hdfc: { symbol: "HDFC", title: "HDFC BANK LIMITED", logo: HDFC },
  sbi: { symbol: "SBI", title: "STATE BANK OF INDIA", logo: SBI },
  bob: { symbol: "BOB", title: "BANK OF BARODA", logo: BOB },
  axis: { symbol: "AXIS", title: "AXIS BANK LIMITED", logo: AXIS },
};
