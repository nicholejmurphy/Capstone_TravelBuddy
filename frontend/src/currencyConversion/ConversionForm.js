import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core";
import ConversionApi from "../api/conversionApi";

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  tip: {
    padding: theme.spacing(2),
    width: "320px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/** Currency conversion form
 *  - Parent passes convert() which will trigger
 *    useEffect updating conversionResults in parent
 */
function ConversionForm({ convert }) {
  const [formData, setFormData] = useState({ to: "", from: "", amount: 0 });
  const [formErrors, setFormErrors] = useState([]);
  const classes = useStyles();

  /** Handle form input changes
   *  - update formData state to catch all form changes
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** Handle form submition
   *  - Attempts to convert currency with convert() function from parent Conversions
   **/
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      convert(formData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
  }

  return (
    <Paper className={classes.search}>
      {formErrors.length && <Alerts type="error" messages={formErrors} />}
      <form onSubmit={handleSubmit}>
        <FormControl required>
          <InputLabel id="currency-code-selector-to">To</InputLabel>
          <Select
            labelId="select-from"
            name="from"
            id="select-from"
            value={formData.from}
            label="From"
            onChange={handleChange}
          >
            <MenuItem value="AED" title="United Arab Emirates Dirham">
              AED
            </MenuItem>
            <MenuItem value="AFN" title="Afghan Afghani">
              AFN
            </MenuItem>
            <MenuItem value="ALL" title="Albanian Lek">
              ALL
            </MenuItem>
            <MenuItem value="AMD" title="Armenian Dram">
              AMD
            </MenuItem>
            <MenuItem value="ANG" title="Netherlands Antillean Guilder">
              ANG
            </MenuItem>
            <MenuItem value="AOA" title="Angolan Kwanza">
              AOA
            </MenuItem>
            <MenuItem value="ARS" title="Argentine Peso">
              ARS
            </MenuItem>
            <MenuItem value="AUD" title="Australian Dollar">
              AUD
            </MenuItem>
            <MenuItem value="AWG" title="Aruban Florin">
              AWG
            </MenuItem>
            <MenuItem value="AZN" title="Azerbaijani Manat">
              AZN
            </MenuItem>
            <MenuItem value="BAM" title="Bosnia-Herzegovina Convertible Mark">
              BAM
            </MenuItem>
            <MenuItem value="BBD" title="Barbadian Dollar">
              BBD
            </MenuItem>
            <MenuItem value="BDT" title="Bangladeshi Taka">
              BDT
            </MenuItem>
            <MenuItem value="BGN" title="Bulgarian Lev">
              BGN
            </MenuItem>
            <MenuItem value="BHD" title="Bahraini Dinar">
              BHD
            </MenuItem>
            <MenuItem value="BIF" title="Burundian Franc">
              BIF
            </MenuItem>
            <MenuItem value="BMD" title="Bermudan Dollar">
              BMD
            </MenuItem>
            <MenuItem value="BND" title="Brunei Dollar">
              BND
            </MenuItem>
            <MenuItem value="BOB" title="Bolivian Boliviano">
              BOB
            </MenuItem>
            <MenuItem value="BRL" title="Brazilian Real">
              BRL
            </MenuItem>
            <MenuItem value="BSD" title="Bahamian Dollar">
              BSD
            </MenuItem>
            <MenuItem value="BTC" title="Bitcoin">
              BTC
            </MenuItem>
            <MenuItem value="BTN" title="Bhutanese Ngultrum">
              BTN
            </MenuItem>
            <MenuItem value="BWP" title="Botswanan Pula">
              BWP
            </MenuItem>
            <MenuItem value="BYN" title="Belarusian Ruble">
              BYN
            </MenuItem>
            <MenuItem value="BYR" title="Belarusian Ruble">
              BYR
            </MenuItem>
            <MenuItem value="BZD" title="Belize Dollar">
              BZD
            </MenuItem>
            <MenuItem value="CAD" title="Canadian Dollar">
              CAD
            </MenuItem>
            <MenuItem value="CDF" title="Congolese Franc">
              CDF
            </MenuItem>
            <MenuItem value="CHF" title="Swiss Franc">
              CHF
            </MenuItem>
            <MenuItem value="CLF" title="Chilean Unit of Account (UF)">
              CLF
            </MenuItem>
            <MenuItem value="CLP" title="Chilean Peso">
              CLP
            </MenuItem>
            <MenuItem value="CNY" title="Chinese Yuan">
              CNY
            </MenuItem>
            <MenuItem value="COP" title="Colombian Peso">
              COP
            </MenuItem>
            <MenuItem value="CRC" title="Costa Rican Colón">
              CRC
            </MenuItem>
            <MenuItem value="CUC" title="Cuba Convertible Peso">
              CRC
            </MenuItem>
            <MenuItem value="CUP" title="Cuban Peso">
              CUP
            </MenuItem>
            <MenuItem value="CVE" title="Cape Verdean Escudo">
              CVE
            </MenuItem>
            <MenuItem value="CZK" title="Czech Republic Koruna">
              CZK
            </MenuItem>
            <MenuItem value="DJF" title="Djiboutian Franc">
              DJF
            </MenuItem>
            <MenuItem value="DKK" title="Danish Krone">
              DKK
            </MenuItem>
            <MenuItem value="DOP" title="Dominican Peso">
              DOP
            </MenuItem>
            <MenuItem value="DZD" title="Algerian Dinar">
              DZD
            </MenuItem>
            <MenuItem value="EEK" title="Estonian Kroon">
              EEK
            </MenuItem>
            <MenuItem value="EGP" title="Egyptian Pound">
              EGP
            </MenuItem>
            <MenuItem value="ERN" title="Eritrean Nakfa">
              ERN
            </MenuItem>
            <MenuItem value="ETB" title="Ethiopian Birr">
              ETB
            </MenuItem>
            <MenuItem value="EUR" title="Euro">
              EUR
            </MenuItem>
            <MenuItem value="FJD" title="Fijian Dollar">
              FJD
            </MenuItem>
            <MenuItem value="FKP" title="Falkland Islands Pound">
              FKP
            </MenuItem>
            <MenuItem value="GBP" title="British Pound Sterling">
              GBP
            </MenuItem>
            <MenuItem value="GEL" title="Georgian Lari">
              GEL
            </MenuItem>
            <MenuItem value="GGP" title="Guernsey Pound">
              GGP
            </MenuItem>
            <MenuItem value="GHS" title="Ghanaian Cedi">
              GHS
            </MenuItem>
            <MenuItem value="GIP" title="Gibraltar Pound">
              GIP
            </MenuItem>
            <MenuItem value="GMD" title="Gambian Dalasi">
              GMD
            </MenuItem>
            <MenuItem value="GNF" title="Guinean Franc">
              GNF
            </MenuItem>
            <MenuItem value="GTQ" title="Guatemalan Quetzal">
              GTQ
            </MenuItem>
            <MenuItem value="GYD" title="Guyanaese Dollar">
              GYD
            </MenuItem>
            <MenuItem value="HKD" title="Hong Kong Dollar">
              HKD
            </MenuItem>
            <MenuItem value="HNL" title="Honduran Lempira">
              HNL
            </MenuItem>
            <MenuItem value="HRK" title="Croatian Kuna">
              HRK
            </MenuItem>
            <MenuItem value="HTG" title="Haitian Gourde">
              HTG
            </MenuItem>
            <MenuItem value="HUF" title="Hungarian Forint">
              HUF
            </MenuItem>
            <MenuItem value="IDR" title="Indonesian Rupiah">
              IDR
            </MenuItem>
            <MenuItem value="ILS" title="Israeli New Sheqel">
              ILS
            </MenuItem>
            <MenuItem value="IMP" title="Manx pound">
              IMP
            </MenuItem>
            <MenuItem value="INR" title="Indian Rupee">
              INR
            </MenuItem>
            <MenuItem value="IQD" title="Iraqi Dinar">
              IQD
            </MenuItem>
            <MenuItem value="IRR" title="Iranian Rial">
              IRR
            </MenuItem>
            <MenuItem value="ISK" title="Icelandic Króna">
              ISK
            </MenuItem>
            <MenuItem value="JEP" title="Jersey Pound">
              JEP
            </MenuItem>
            <MenuItem value="JMD" title="Jamaican Dollar">
              JMD
            </MenuItem>
            <MenuItem value="JOD" title="Jordanian Dinar">
              JOD
            </MenuItem>
            <MenuItem value="JPY" title="Japanese Yen">
              JPY
            </MenuItem>
            <MenuItem value="KES" title="Kenyan Shilling">
              KES
            </MenuItem>
            <MenuItem value="KGS" title="Kyrgystani Som">
              KGS
            </MenuItem>
            <MenuItem value="KHR" title="Cambodian Riel">
              KHR
            </MenuItem>
            <MenuItem value="KMF" title="Comorian Franc">
              KMF
            </MenuItem>
            <MenuItem value="KPW" title="North Korean Won">
              KPW
            </MenuItem>
            <MenuItem value="KRW" title="South Korean Won">
              KRW
            </MenuItem>
            <MenuItem value="KWD" title="Kuwaiti Dinar">
              KWD
            </MenuItem>
            <MenuItem value="KYD" title="Cayman Islands Dollar">
              KYD
            </MenuItem>
            <MenuItem value="KZT" title="Kazakhstani Tenge">
              KZT
            </MenuItem>
            <MenuItem value="LAK" title="Laotian Kip">
              LAK
            </MenuItem>
            <MenuItem value="LBP" title="Lebanese Pound">
              LBP
            </MenuItem>
            <MenuItem value="LKR" title="Sri Lankan Rupee">
              LKR
            </MenuItem>
            <MenuItem value="LRD" title="Liberian Dollar">
              LRD
            </MenuItem>
            <MenuItem value="LSL" title="Lesotho Loti">
              LSL
            </MenuItem>
            <MenuItem value="LTL" title="Lithuanian Litas">
              LTL
            </MenuItem>
            <MenuItem value="LVL" title="Latvian Lats">
              LVL
            </MenuItem>
            <MenuItem value="LYD" title="Libyan Dinar">
              LYD
            </MenuItem>
            <MenuItem value="MAD" title="Moroccan Dirham">
              MAD
            </MenuItem>
            <MenuItem value="MDL" title="Moldovan Leu">
              MDL
            </MenuItem>
            <MenuItem value="MGA" title="Malagasy Ariary">
              MGA
            </MenuItem>
            <MenuItem value="MKD" title="Macedonian Denar">
              MKD
            </MenuItem>
            <MenuItem value="MMK" title="Myanma Kyat">
              MMK
            </MenuItem>
            <MenuItem value="MNT" title="Mongolian Tugrik">
              MNT
            </MenuItem>
            <MenuItem value="MOP" title="Macanese Pataca">
              MOP
            </MenuItem>
            <MenuItem value="MRO" title="Mauritanian Ouguiya">
              MRO
            </MenuItem>
            <MenuItem value="MUR" title="Mauritian Rupee">
              MUR
            </MenuItem>
            <MenuItem value="MVR" title="Maldivian Rufiyaa">
              MVR
            </MenuItem>
            <MenuItem value="MWK" title="Malawian Kwacha">
              MWK
            </MenuItem>
            <MenuItem value="MXN" title="Mexican Peso">
              MXN
            </MenuItem>
            <MenuItem value="MYR" title="Malaysian Ringgit">
              MYR
            </MenuItem>
            <MenuItem value="MZN" title="Mozambican Metical">
              MZN
            </MenuItem>
            <MenuItem value="NAD" title="Namibian Dollar">
              NAD
            </MenuItem>
            <MenuItem value="NGN" title="Nigerian Naira">
              NGN
            </MenuItem>
            <MenuItem value="NIO" title="Nicaraguan Córdoba">
              NIO
            </MenuItem>
            <MenuItem value="NOK" title="Norwegian Krone">
              NOK
            </MenuItem>
            <MenuItem value="NPR" title="Nepalese Rupee">
              NPR
            </MenuItem>
            <MenuItem value="NZD" title="New Zealand Dollar">
              NZD
            </MenuItem>
            <MenuItem value="OMR" title="Omani Rial">
              OMR
            </MenuItem>
            <MenuItem value="PAB" title="Panamanian Balboa">
              PAB
            </MenuItem>
            <MenuItem value="PEN" title="Peruvian Nuevo Sol">
              PEN
            </MenuItem>
            <MenuItem value="PGK" title="Papua New Guinean Kina">
              PGK
            </MenuItem>
            <MenuItem value="PHP" title="Philippine Peso">
              PHP
            </MenuItem>
            <MenuItem value="PKR" title="Pakistani Rupee">
              PKR
            </MenuItem>
            <MenuItem value="PLN" title="Polish Zloty">
              PLN
            </MenuItem>
            <MenuItem value="PYG" title="Paraguayan Guarani">
              PYG
            </MenuItem>
            <MenuItem value="QAR" title="Qatari Rial">
              QAR
            </MenuItem>
            <MenuItem value="RON" title="Romanian Leu">
              RON
            </MenuItem>
            <MenuItem value="RSD" title="Serbian Dinar">
              RSD
            </MenuItem>
            <MenuItem value="RUB" title="Russian Ruble">
              RUB
            </MenuItem>
            <MenuItem value="RWF" title="Rwandan Franc">
              RWF
            </MenuItem>
            <MenuItem value="SAR" title="Saudi Riyal">
              SAR
            </MenuItem>
            <MenuItem value="SBD" title="Solomon Islands Dollar">
              SBD
            </MenuItem>
            <MenuItem value="SCR" title="Seychellois Rupee">
              SCR
            </MenuItem>
            <MenuItem value="SDG" title="Sudanese Pound">
              SDG
            </MenuItem>
            <MenuItem value="SEK" title="Swedish Krona">
              SEK
            </MenuItem>
            <MenuItem value="SGD" title="Singapore Dollar">
              SGD
            </MenuItem>
            <MenuItem value="SHP" title="Saint Helena Pound">
              SHP
            </MenuItem>
            <MenuItem value="SLL" title="Sierra Leonean Leone">
              SLL
            </MenuItem>
            <MenuItem value="SOS" title="Somali Shilling">
              SOS
            </MenuItem>
            <MenuItem value="SRD" title="Surinamese Dollar">
              SRD
            </MenuItem>
            <MenuItem value="STD" title="São Tomé and Príncipe Dobra">
              STD
            </MenuItem>
            <MenuItem value="SVC" title="Salvadoran Colón">
              SVC
            </MenuItem>
            <MenuItem value="SYP" title="Syrian Pound">
              SYP
            </MenuItem>
            <MenuItem value="SZL" title="Swazi Lilangeni">
              SZL
            </MenuItem>
            <MenuItem value="THB" title="Thai Baht">
              THB
            </MenuItem>
            <MenuItem value="TJS" title="Tajikistani Somoni">
              TJS
            </MenuItem>
            <MenuItem value="TMT" title="Turkmenistani Manat">
              TMT
            </MenuItem>
            <MenuItem value="TND" title="Tunisian Dinar">
              TND
            </MenuItem>
            <MenuItem value="TOP" title="Tongan Pa?anga">
              TOP
            </MenuItem>
            <MenuItem value="TRY" title="Turkish Lira">
              TRY
            </MenuItem>
            <MenuItem value="TTD" title="Trinidad and Tobago Dollar">
              TTD
            </MenuItem>
            <MenuItem value="TWD" title="New Taiwan Dollar">
              TWD
            </MenuItem>
            <MenuItem value="TZS" title="Tanzanian Shilling">
              TZS
            </MenuItem>
            <MenuItem value="UAH" title="Ukrainian Hryvnia">
              UAH
            </MenuItem>
            <MenuItem value="UGX" title="Ugandan Shilling">
              UGX
            </MenuItem>
            <MenuItem value="USD" title="United States Dollar">
              USD
            </MenuItem>
            <MenuItem value="UYU" title="Uruguayan Peso">
              UYU
            </MenuItem>
            <MenuItem value="UZS" title="Uzbekistan Som">
              UZS
            </MenuItem>
            <MenuItem value="VEF" title="Venezuelan Bolívar">
              VEF
            </MenuItem>
            <MenuItem value="VND" title="Vietnamese Dong">
              VND
            </MenuItem>
            <MenuItem value="VUV" title="Vanuatu Vatu">
              VUV
            </MenuItem>
            <MenuItem value="WST" title="Samoan Tala">
              WST
            </MenuItem>
            <MenuItem value="XAF" title="CFA Franc BEAC">
              XAF
            </MenuItem>
            <MenuItem value="XAG" title="Silver (troy ounce)">
              XAG
            </MenuItem>
            <MenuItem value="XAU" title="Gold (troy ounce)">
              XAU
            </MenuItem>
            <MenuItem value="XCD" title="East Caribbean Dollar">
              XCD
            </MenuItem>
            <MenuItem value="XDR" title="Special Drawing Rights">
              XDR
            </MenuItem>
            <MenuItem value="XOF" title="CFA Franc BCEAO">
              XOF
            </MenuItem>
            <MenuItem value="XPF" title="CFP Franc">
              XPF
            </MenuItem>
            <MenuItem value="YER" title="Yemeni Rial">
              YER
            </MenuItem>
            <MenuItem value="ZAR" title="South African Rand">
              ZAR
            </MenuItem>
            <MenuItem value="ZMK" title="Zambian Kwacha (pre-2013)">
              ZMK
            </MenuItem>
            <MenuItem value="ZMW" title="Zambian Kwacha">
              ZWL
            </MenuItem>
            <MenuItem value="ZWL" title="Zimbabwean Dollar">
              ZWL
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl required>
          <InputLabel id="currency-code-selector-to">To</InputLabel>
          <Select
            labelId="select-to"
            name="to"
            id="select-to"
            value={formData.to}
            label="To"
            onChange={handleChange}
          >
            <MenuItem value="AED" title="United Arab Emirates Dirham">
              AED
            </MenuItem>
            <MenuItem value="AFN" title="Afghan Afghani">
              AFN
            </MenuItem>
            <MenuItem value="ALL" title="Albanian Lek">
              ALL
            </MenuItem>
            <MenuItem value="AMD" title="Armenian Dram">
              AMD
            </MenuItem>
            <MenuItem value="ANG" title="Netherlands Antillean Guilder">
              ANG
            </MenuItem>
            <MenuItem value="AOA" title="Angolan Kwanza">
              AOA
            </MenuItem>
            <MenuItem value="ARS" title="Argentine Peso">
              ARS
            </MenuItem>
            <MenuItem value="AUD" title="Australian Dollar">
              AUD
            </MenuItem>
            <MenuItem value="AWG" title="Aruban Florin">
              AWG
            </MenuItem>
            <MenuItem value="AZN" title="Azerbaijani Manat">
              AZN
            </MenuItem>
            <MenuItem value="BAM" title="Bosnia-Herzegovina Convertible Mark">
              BAM
            </MenuItem>
            <MenuItem value="BBD" title="Barbadian Dollar">
              BBD
            </MenuItem>
            <MenuItem value="BDT" title="Bangladeshi Taka">
              BDT
            </MenuItem>
            <MenuItem value="BGN" title="Bulgarian Lev">
              BGN
            </MenuItem>
            <MenuItem value="BHD" title="Bahraini Dinar">
              BHD
            </MenuItem>
            <MenuItem value="BIF" title="Burundian Franc">
              BIF
            </MenuItem>
            <MenuItem value="BMD" title="Bermudan Dollar">
              BMD
            </MenuItem>
            <MenuItem value="BND" title="Brunei Dollar">
              BND
            </MenuItem>
            <MenuItem value="BOB" title="Bolivian Boliviano">
              BOB
            </MenuItem>
            <MenuItem value="BRL" title="Brazilian Real">
              BRL
            </MenuItem>
            <MenuItem value="BSD" title="Bahamian Dollar">
              BSD
            </MenuItem>
            <MenuItem value="BTC" title="Bitcoin">
              BTC
            </MenuItem>
            <MenuItem value="BTN" title="Bhutanese Ngultrum">
              BTN
            </MenuItem>
            <MenuItem value="BWP" title="Botswanan Pula">
              BWP
            </MenuItem>
            <MenuItem value="BYN" title="Belarusian Ruble">
              BYN
            </MenuItem>
            <MenuItem value="BYR" title="Belarusian Ruble">
              BYR
            </MenuItem>
            <MenuItem value="BZD" title="Belize Dollar">
              BZD
            </MenuItem>
            <MenuItem value="CAD" title="Canadian Dollar">
              CAD
            </MenuItem>
            <MenuItem value="CDF" title="Congolese Franc">
              CDF
            </MenuItem>
            <MenuItem value="CHF" title="Swiss Franc">
              CHF
            </MenuItem>
            <MenuItem value="CLF" title="Chilean Unit of Account (UF)">
              CLF
            </MenuItem>
            <MenuItem value="CLP" title="Chilean Peso">
              CLP
            </MenuItem>
            <MenuItem value="CNY" title="Chinese Yuan">
              CNY
            </MenuItem>
            <MenuItem value="COP" title="Colombian Peso">
              COP
            </MenuItem>
            <MenuItem value="CRC" title="Costa Rican Colón">
              CRC
            </MenuItem>
            <MenuItem value="CUC" title="Cuba Convertible Peso">
              CRC
            </MenuItem>
            <MenuItem value="CUP" title="Cuban Peso">
              CUP
            </MenuItem>
            <MenuItem value="CVE" title="Cape Verdean Escudo">
              CVE
            </MenuItem>
            <MenuItem value="CZK" title="Czech Republic Koruna">
              CZK
            </MenuItem>
            <MenuItem value="DJF" title="Djiboutian Franc">
              DJF
            </MenuItem>
            <MenuItem value="DKK" title="Danish Krone">
              DKK
            </MenuItem>
            <MenuItem value="DOP" title="Dominican Peso">
              DOP
            </MenuItem>
            <MenuItem value="DZD" title="Algerian Dinar">
              DZD
            </MenuItem>
            <MenuItem value="EEK" title="Estonian Kroon">
              EEK
            </MenuItem>
            <MenuItem value="EGP" title="Egyptian Pound">
              EGP
            </MenuItem>
            <MenuItem value="ERN" title="Eritrean Nakfa">
              ERN
            </MenuItem>
            <MenuItem value="ETB" title="Ethiopian Birr">
              ETB
            </MenuItem>
            <MenuItem value="EUR" title="Euro">
              EUR
            </MenuItem>
            <MenuItem value="FJD" title="Fijian Dollar">
              FJD
            </MenuItem>
            <MenuItem value="FKP" title="Falkland Islands Pound">
              FKP
            </MenuItem>
            <MenuItem value="GBP" title="British Pound Sterling">
              GBP
            </MenuItem>
            <MenuItem value="GEL" title="Georgian Lari">
              GEL
            </MenuItem>
            <MenuItem value="GGP" title="Guernsey Pound">
              GGP
            </MenuItem>
            <MenuItem value="GHS" title="Ghanaian Cedi">
              GHS
            </MenuItem>
            <MenuItem value="GIP" title="Gibraltar Pound">
              GIP
            </MenuItem>
            <MenuItem value="GMD" title="Gambian Dalasi">
              GMD
            </MenuItem>
            <MenuItem value="GNF" title="Guinean Franc">
              GNF
            </MenuItem>
            <MenuItem value="GTQ" title="Guatemalan Quetzal">
              GTQ
            </MenuItem>
            <MenuItem value="GYD" title="Guyanaese Dollar">
              GYD
            </MenuItem>
            <MenuItem value="HKD" title="Hong Kong Dollar">
              HKD
            </MenuItem>
            <MenuItem value="HNL" title="Honduran Lempira">
              HNL
            </MenuItem>
            <MenuItem value="HRK" title="Croatian Kuna">
              HRK
            </MenuItem>
            <MenuItem value="HTG" title="Haitian Gourde">
              HTG
            </MenuItem>
            <MenuItem value="HUF" title="Hungarian Forint">
              HUF
            </MenuItem>
            <MenuItem value="IDR" title="Indonesian Rupiah">
              IDR
            </MenuItem>
            <MenuItem value="ILS" title="Israeli New Sheqel">
              ILS
            </MenuItem>
            <MenuItem value="IMP" title="Manx pound">
              IMP
            </MenuItem>
            <MenuItem value="INR" title="Indian Rupee">
              INR
            </MenuItem>
            <MenuItem value="IQD" title="Iraqi Dinar">
              IQD
            </MenuItem>
            <MenuItem value="IRR" title="Iranian Rial">
              IRR
            </MenuItem>
            <MenuItem value="ISK" title="Icelandic Króna">
              ISK
            </MenuItem>
            <MenuItem value="JEP" title="Jersey Pound">
              JEP
            </MenuItem>
            <MenuItem value="JMD" title="Jamaican Dollar">
              JMD
            </MenuItem>
            <MenuItem value="JOD" title="Jordanian Dinar">
              JOD
            </MenuItem>
            <MenuItem value="JPY" title="Japanese Yen">
              JPY
            </MenuItem>
            <MenuItem value="KES" title="Kenyan Shilling">
              KES
            </MenuItem>
            <MenuItem value="KGS" title="Kyrgystani Som">
              KGS
            </MenuItem>
            <MenuItem value="KHR" title="Cambodian Riel">
              KHR
            </MenuItem>
            <MenuItem value="KMF" title="Comorian Franc">
              KMF
            </MenuItem>
            <MenuItem value="KPW" title="North Korean Won">
              KPW
            </MenuItem>
            <MenuItem value="KRW" title="South Korean Won">
              KRW
            </MenuItem>
            <MenuItem value="KWD" title="Kuwaiti Dinar">
              KWD
            </MenuItem>
            <MenuItem value="KYD" title="Cayman Islands Dollar">
              KYD
            </MenuItem>
            <MenuItem value="KZT" title="Kazakhstani Tenge">
              KZT
            </MenuItem>
            <MenuItem value="LAK" title="Laotian Kip">
              LAK
            </MenuItem>
            <MenuItem value="LBP" title="Lebanese Pound">
              LBP
            </MenuItem>
            <MenuItem value="LKR" title="Sri Lankan Rupee">
              LKR
            </MenuItem>
            <MenuItem value="LRD" title="Liberian Dollar">
              LRD
            </MenuItem>
            <MenuItem value="LSL" title="Lesotho Loti">
              LSL
            </MenuItem>
            <MenuItem value="LTL" title="Lithuanian Litas">
              LTL
            </MenuItem>
            <MenuItem value="LVL" title="Latvian Lats">
              LVL
            </MenuItem>
            <MenuItem value="LYD" title="Libyan Dinar">
              LYD
            </MenuItem>
            <MenuItem value="MAD" title="Moroccan Dirham">
              MAD
            </MenuItem>
            <MenuItem value="MDL" title="Moldovan Leu">
              MDL
            </MenuItem>
            <MenuItem value="MGA" title="Malagasy Ariary">
              MGA
            </MenuItem>
            <MenuItem value="MKD" title="Macedonian Denar">
              MKD
            </MenuItem>
            <MenuItem value="MMK" title="Myanma Kyat">
              MMK
            </MenuItem>
            <MenuItem value="MNT" title="Mongolian Tugrik">
              MNT
            </MenuItem>
            <MenuItem value="MOP" title="Macanese Pataca">
              MOP
            </MenuItem>
            <MenuItem value="MRO" title="Mauritanian Ouguiya">
              MRO
            </MenuItem>
            <MenuItem value="MUR" title="Mauritian Rupee">
              MUR
            </MenuItem>
            <MenuItem value="MVR" title="Maldivian Rufiyaa">
              MVR
            </MenuItem>
            <MenuItem value="MWK" title="Malawian Kwacha">
              MWK
            </MenuItem>
            <MenuItem value="MXN" title="Mexican Peso">
              MXN
            </MenuItem>
            <MenuItem value="MYR" title="Malaysian Ringgit">
              MYR
            </MenuItem>
            <MenuItem value="MZN" title="Mozambican Metical">
              MZN
            </MenuItem>
            <MenuItem value="NAD" title="Namibian Dollar">
              NAD
            </MenuItem>
            <MenuItem value="NGN" title="Nigerian Naira">
              NGN
            </MenuItem>
            <MenuItem value="NIO" title="Nicaraguan Córdoba">
              NIO
            </MenuItem>
            <MenuItem value="NOK" title="Norwegian Krone">
              NOK
            </MenuItem>
            <MenuItem value="NPR" title="Nepalese Rupee">
              NPR
            </MenuItem>
            <MenuItem value="NZD" title="New Zealand Dollar">
              NZD
            </MenuItem>
            <MenuItem value="OMR" title="Omani Rial">
              OMR
            </MenuItem>
            <MenuItem value="PAB" title="Panamanian Balboa">
              PAB
            </MenuItem>
            <MenuItem value="PEN" title="Peruvian Nuevo Sol">
              PEN
            </MenuItem>
            <MenuItem value="PGK" title="Papua New Guinean Kina">
              PGK
            </MenuItem>
            <MenuItem value="PHP" title="Philippine Peso">
              PHP
            </MenuItem>
            <MenuItem value="PKR" title="Pakistani Rupee">
              PKR
            </MenuItem>
            <MenuItem value="PLN" title="Polish Zloty">
              PLN
            </MenuItem>
            <MenuItem value="PYG" title="Paraguayan Guarani">
              PYG
            </MenuItem>
            <MenuItem value="QAR" title="Qatari Rial">
              QAR
            </MenuItem>
            <MenuItem value="RON" title="Romanian Leu">
              RON
            </MenuItem>
            <MenuItem value="RSD" title="Serbian Dinar">
              RSD
            </MenuItem>
            <MenuItem value="RUB" title="Russian Ruble">
              RUB
            </MenuItem>
            <MenuItem value="RWF" title="Rwandan Franc">
              RWF
            </MenuItem>
            <MenuItem value="SAR" title="Saudi Riyal">
              SAR
            </MenuItem>
            <MenuItem value="SBD" title="Solomon Islands Dollar">
              SBD
            </MenuItem>
            <MenuItem value="SCR" title="Seychellois Rupee">
              SCR
            </MenuItem>
            <MenuItem value="SDG" title="Sudanese Pound">
              SDG
            </MenuItem>
            <MenuItem value="SEK" title="Swedish Krona">
              SEK
            </MenuItem>
            <MenuItem value="SGD" title="Singapore Dollar">
              SGD
            </MenuItem>
            <MenuItem value="SHP" title="Saint Helena Pound">
              SHP
            </MenuItem>
            <MenuItem value="SLL" title="Sierra Leonean Leone">
              SLL
            </MenuItem>
            <MenuItem value="SOS" title="Somali Shilling">
              SOS
            </MenuItem>
            <MenuItem value="SRD" title="Surinamese Dollar">
              SRD
            </MenuItem>
            <MenuItem value="STD" title="São Tomé and Príncipe Dobra">
              STD
            </MenuItem>
            <MenuItem value="SVC" title="Salvadoran Colón">
              SVC
            </MenuItem>
            <MenuItem value="SYP" title="Syrian Pound">
              SYP
            </MenuItem>
            <MenuItem value="SZL" title="Swazi Lilangeni">
              SZL
            </MenuItem>
            <MenuItem value="THB" title="Thai Baht">
              THB
            </MenuItem>
            <MenuItem value="TJS" title="Tajikistani Somoni">
              TJS
            </MenuItem>
            <MenuItem value="TMT" title="Turkmenistani Manat">
              TMT
            </MenuItem>
            <MenuItem value="TND" title="Tunisian Dinar">
              TND
            </MenuItem>
            <MenuItem value="TOP" title="Tongan Pa?anga">
              TOP
            </MenuItem>
            <MenuItem value="TRY" title="Turkish Lira">
              TRY
            </MenuItem>
            <MenuItem value="TTD" title="Trinidad and Tobago Dollar">
              TTD
            </MenuItem>
            <MenuItem value="TWD" title="New Taiwan Dollar">
              TWD
            </MenuItem>
            <MenuItem value="TZS" title="Tanzanian Shilling">
              TZS
            </MenuItem>
            <MenuItem value="UAH" title="Ukrainian Hryvnia">
              UAH
            </MenuItem>
            <MenuItem value="UGX" title="Ugandan Shilling">
              UGX
            </MenuItem>
            <MenuItem value="USD" title="United States Dollar">
              USD
            </MenuItem>
            <MenuItem value="UYU" title="Uruguayan Peso">
              UYU
            </MenuItem>
            <MenuItem value="UZS" title="Uzbekistan Som">
              UZS
            </MenuItem>
            <MenuItem value="VEF" title="Venezuelan Bolívar">
              VEF
            </MenuItem>
            <MenuItem value="VND" title="Vietnamese Dong">
              VND
            </MenuItem>
            <MenuItem value="VUV" title="Vanuatu Vatu">
              VUV
            </MenuItem>
            <MenuItem value="WST" title="Samoan Tala">
              WST
            </MenuItem>
            <MenuItem value="XAF" title="CFA Franc BEAC">
              XAF
            </MenuItem>
            <MenuItem value="XAG" title="Silver (troy ounce)">
              XAG
            </MenuItem>
            <MenuItem value="XAU" title="Gold (troy ounce)">
              XAU
            </MenuItem>
            <MenuItem value="XCD" title="East Caribbean Dollar">
              XCD
            </MenuItem>
            <MenuItem value="XDR" title="Special Drawing Rights">
              XDR
            </MenuItem>
            <MenuItem value="XOF" title="CFA Franc BCEAO">
              XOF
            </MenuItem>
            <MenuItem value="XPF" title="CFP Franc">
              XPF
            </MenuItem>
            <MenuItem value="YER" title="Yemeni Rial">
              YER
            </MenuItem>
            <MenuItem value="ZAR" title="South African Rand">
              ZAR
            </MenuItem>
            <MenuItem value="ZMK" title="Zambian Kwacha (pre-2013)">
              ZMK
            </MenuItem>
            <MenuItem value="ZMW" title="Zambian Kwacha">
              ZWL
            </MenuItem>
            <MenuItem value="ZWL" title="Zimbabwean Dollar">
              ZWL
            </MenuItem>
          </Select>
        </FormControl>
        <div>
          {" "}
          <TextField
            id="amount"
            label="Amout"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            required
          />
        </div>
        <Button color="primary" type="submit">
          Update
        </Button>
      </form>
    </Paper>
  );
}

export default ConversionForm;

/**To do
 * - update imports for mui components
 * - add label text to describe form
 * - remove and edit class names
 * - test api in fe & be
 * - test form submissions
 * - add convert() function to parent conversion
 * - create a conversion results component
 * - edit styling from conversions component
 */
