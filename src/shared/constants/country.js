// ISO 3166-1 alpha-2

const countries = [
    { code: "GB", label: "United Kingdom", phone: "44", iso: "826" },
    { code: "AD", label: "Andorra", phone: "376", iso: "020" },
    { code: "AE", label: "United Arab Emirates", phone: "971", iso: "784" },
    { code: "AF", label: "Afghanistan", phone: "93", iso: "004" },
    { code: "AG", label: "Antigua and Barbuda", phone: "1-268", iso: "028" },
    { code: "AI", label: "Anguilla", phone: "1-264", iso: "660" },
    { code: "AL", label: "Albania", phone: "355", iso: "008" },
    { code: "AM", label: "Armenia", phone: "374", iso: "051" },
    { code: "AO", label: "Angola", phone: "244", iso: "024" },
    { code: "AR", label: "Argentina", phone: "54", iso: "032" },
    { code: "AS", label: "American Samoa", phone: "1-684", iso: "016" },
    { code: "AT", label: "Austria", phone: "43", iso: "040" },
    { code: "AU", label: "Australia", phone: "61", suggested: true, iso: "036" },
    { code: "AW", label: "Aruba", phone: "297", iso: "533" },
    { code: "AX", label: "Alland Islands", phone: "358", iso: "248" },
    { code: "AZ", label: "Azerbaijan", phone: "994", iso: "031" },
    { code: "BA", label: "Bosnia and Herzegovina", phone: "387", iso: "070" },
    { code: "BB", label: "Barbados", phone: "1-246", iso: "052" },
    { code: "BD", label: "Bangladesh", phone: "880", iso: "050" },
    { code: "BE", label: "Belgium", phone: "32", iso: "056" },
    { code: "BF", label: "Burkina Faso", phone: "226", iso: "854" },
    { code: "BG", label: "Bulgaria", phone: "359", iso: "100" },
    { code: "BH", label: "Bahrain", phone: "973", iso: "048" },
    { code: "BI", label: "Burundi", phone: "257", iso: "108" },
    { code: "BJ", label: "Benin", phone: "229", iso: "204" },
    { code: "BL", label: "Saint Barthelemy", phone: "590", iso: "652" },
    { code: "BM", label: "Bermuda", phone: "1-441", iso: "060" },
    { code: "BN", label: "Brunei Darussalam", phone: "673", iso: "096" },
    { code: "BO", label: "Bolivia", phone: "591", iso: "068" },
    { code: "BR", label: "Brazil", phone: "55", iso: "076" },
    { code: "BS", label: "Bahamas", phone: "1-242", iso: "044" },
    { code: "BT", label: "Bhutan", phone: "975", iso: "064" },
    { code: "BV", label: "Bouvet Island", phone: "47", iso: "074" },
    { code: "BW", label: "Botswana", phone: "267", iso: "072" },
    { code: "BY", label: "Belarus", phone: "375", iso: "112" },
    { code: "BZ", label: "Belize", phone: "501", iso: "084" },
    { code: "CA", label: "Canada", phone: "1", suggested: true, iso: "124" },
    { code: "CC", label: "Cocos (Keeling) Islands", phone: "61", iso: "166" },
    { code: "CD", label: "Congo, Democratic Republic of the", phone: "243", iso: "180" },
    { code: "CF", label: "Central African Republic", phone: "236", iso: "140" },
    { code: "CG", label: "Congo, Republic of the", phone: "242", iso: "178" },
    { code: "CH", label: "Switzerland", phone: "41", iso: "756" },
    { code: "CI", label: "Cote d'Ivoire", phone: "225", iso: "384" },
    { code: "CK", label: "Cook Islands", phone: "682", iso: "184" },
    { code: "CL", label: "Chile", phone: "56", iso: "152" },
    { code: "CM", label: "Cameroon", phone: "237", iso: "120" },
    { code: "CN", label: "China", phone: "86", iso: "156" },
    { code: "CO", label: "Colombia", phone: "57", iso: "170" },
    { code: "CR", label: "Costa Rica", phone: "506", iso: "188" },
    { code: "CU", label: "Cuba", phone: "53", iso: "192" },
    { code: "CV", label: "Cape Verde", phone: "238", iso: "132" },
    { code: "CW", label: "Curacao", phone: "599", iso: "531" },
    { code: "CX", label: "Christmas Island", phone: "61", iso: "162" },
    { code: "CY", label: "Cyprus", phone: "357", iso: "196" },
    { code: "CZ", label: "Czech Republic", phone: "420", iso: "203" },
    { code: "DE", label: "Germany", phone: "49", suggested: true, iso: "276" },
    { code: "DJ", label: "Djibouti", phone: "253", iso: "262" },
    { code: "DK", label: "Denmark", phone: "45", iso: "208" },
    { code: "DM", label: "Dominica", phone: "1-767", iso: "212" },
    { code: "DO", label: "Dominican Republic", phone: "1-809", iso: "214" },
    { code: "DZ", label: "Algeria", phone: "213", iso: "012" },
    { code: "EC", label: "Ecuador", phone: "593", iso: "218" },
    { code: "EE", label: "Estonia", phone: "372", iso: "233" },
    { code: "EG", label: "Egypt", phone: "20", iso: "818" },
    { code: "ER", label: "Eritrea", phone: "291", iso: "232" },
    { code: "ES", label: "Spain", phone: "34", iso: "724" },
    { code: "ET", label: "Ethiopia", phone: "251", iso: "231" },
    { code: "FI", label: "Finland", phone: "358", iso: "246" },
    { code: "FJ", label: "Fiji", phone: "679", iso: "242" },
    { code: "FK", label: "Falkland Islands (Malvinas)", phone: "500", iso: "238" },
    { code: "FM", label: "Micronesia, Federated States of", phone: "691", iso: "583" },
    { code: "FO", label: "Faroe Islands", phone: "298", iso: "234" },
    { code: "FR", label: "France", phone: "33", suggested: true, iso: "250" },
    { code: "GA", label: "Gabon", phone: "241", iso: "266" },
    { code: "GD", label: "Grenada", phone: "1-473", iso: "308" },
    { code: "GE", label: "Georgia", phone: "995", iso: "268" },
    { code: "GF", label: "French Guiana", phone: "594", iso: "254" },
    { code: "GG", label: "Guernsey", phone: "44", iso: "831" },
    { code: "GH", label: "Ghana", phone: "233", iso: "288" },
    { code: "GI", label: "Gibraltar", phone: "350", iso: "292" },
    { code: "GL", label: "Greenland", phone: "299", iso: "304" },
    { code: "GM", label: "Gambia", phone: "220", iso: "270" },
    { code: "GN", label: "Guinea", phone: "224", iso: "324" },
    { code: "GP", label: "Guadeloupe", phone: "590", iso: "312" },
    { code: "GQ", label: "Equatorial Guinea", phone: "240", iso: "226" },
    { code: "GR", label: "Greece", phone: "30", iso: "300" },
    { code: "GS", label: "South Georgia and the South Sandwich Islands", phone: "500", iso: "239" },
    { code: "GT", label: "Guatemala", phone: "502", iso: "320" },
    { code: "GU", label: "Guam", phone: "1-671", iso: "316" },
    { code: "GW", label: "Guinea-Bissau", phone: "245", iso: "624" },
    { code: "GY", label: "Guyana", phone: "592", iso: "328" },
    { code: "HK", label: "Hong Kong", phone: "852", iso: "344" },
    { code: "HM", label: "Heard Island and McDonald Islands", phone: "672", iso: "334" },
    { code: "HN", label: "Honduras", phone: "504", iso: "340" },
    { code: "HR", label: "Croatia", phone: "385", iso: "191" },
    { code: "HT", label: "Haiti", phone: "509", iso: "332" },
    { code: "HU", label: "Hungary", phone: "36", iso: "348" },
    { code: "ID", label: "Indonesia", phone: "62", iso: "360" },
    { code: "IE", label: "Ireland", phone: "353", iso: "372" },
    { code: "IL", label: "Israel", phone: "972", iso: "376" },
    { code: "IM", label: "Isle of Man", phone: "44", iso: "833" },
    { code: "IN", label: "India", phone: "91", iso: "356" },
    { code: "IO", label: "British Indian Ocean Territory", phone: "246", iso: "086" },
    { code: "IQ", label: "Iraq", phone: "964", iso: "368" },
    { code: "IR", label: "Iran, Islamic Republic of", phone: "98", iso: "364" },
    { code: "IS", label: "Iceland", phone: "354", iso: "352" },
    { code: "IT", label: "Italy", phone: "39", iso: "380" },
    { code: "JE", label: "Jersey", phone: "44", iso: "832" },
    { code: "JM", label: "Jamaica", phone: "1-876", iso: "388" },
    { code: "JO", label: "Jordan", phone: "962", iso: "400" },
    { code: "JP", label: "Japan", phone: "81", suggested: true, iso: "392" },
    { code: "KE", label: "Kenya", phone: "254", iso: "404" },
    { code: "KG", label: "Kyrgyzstan", phone: "996", iso: "417" },
    { code: "KH", label: "Cambodia", phone: "855", iso: "116" },
    { code: "KI", label: "Kiribati", phone: "686", iso: "296" },
    { code: "KM", label: "Comoros", phone: "269", iso: "174" },
    { code: "KN", label: "Saint Kitts and Nevis", phone: "1-869", iso: "659" },
    { code: "KP", label: "Korea, Democratic People's Republic of", phone: "850", iso: "408" },
    { code: "KR", label: "Korea, Republic of", phone: "82", iso: "410" },
    { code: "KW", label: "Kuwait", phone: "965", iso: "414" },
    { code: "KY", label: "Cayman Islands", phone: "1-345", iso: "136" },
    { code: "KZ", label: "Kazakhstan", phone: "7", iso: "398" },
    { code: "LA", label: "Lao People's Democratic Republic", phone: "856", iso: "418" },
    { code: "LB", label: "Lebanon", phone: "961", iso: "422" },
    { code: "LC", label: "Saint Lucia", phone: "1-758", iso: "662" },
    { code: "LI", label: "Liechtenstein", phone: "423", iso: "438" },
    { code: "LK", label: "Sri Lanka", phone: "94", iso: "144" },
    { code: "LR", label: "Liberia", phone: "231", iso: "430" },
    { code: "LS", label: "Lesotho", phone: "266", iso: "426" },
    { code: "LT", label: "Lithuania", phone: "370", iso: "440" },
    { code: "LU", label: "Luxembourg", phone: "352", iso: "442" },
    { code: "LV", label: "Latvia", phone: "371", iso: "428" },
    { code: "LY", label: "Libya", phone: "218", iso: "434" },
    { code: "MA", label: "Morocco", phone: "212", iso: "504" },
    { code: "MC", label: "Monaco", phone: "377", iso: "492" },
    { code: "MD", label: "Moldova, Republic of", phone: "373", iso: "498" },
    { code: "ME", label: "Montenegro", phone: "382", iso: "499" },
    { code: "MG", label: "Madagascar", phone: "261", iso: "450" },
    { code: "MH", label: "Marshall Islands", phone: "692", iso: "584" },
    { code: "MK", label: "Macedonia, the Former Yugoslav Republic of", phone: "389", iso: "807" },
    { code: "ML", label: "Mali", phone: "223", iso: "466" },
    { code: "MM", label: "Myanmar", phone: "95", iso: "104" },
    { code: "MN", label: "Mongolia", phone: "976", iso: "496" },
    { code: "MO", label: "Macao", phone: "853", iso: "446" },
    { code: "MP", label: "Northern Mariana Islands", phone: "1-670", iso: "580" },
    { code: "MQ", label: "Martinique", phone: "596", iso: "474" },
    { code: "MR", label: "Mauritania", phone: "222", iso: "478" },
    { code: "MS", label: "Montserrat", phone: "1-664", iso: "500" },
    { code: "MT", label: "Malta", phone: "356", iso: "470" },
    { code: "MU", label: "Mauritius", phone: "230", iso: "480" },
    { code: "MV", label: "Maldives", phone: "960", iso: "462" },
    { code: "MW", label: "Malawi", phone: "265", iso: "454" },
    { code: "MX", label: "Mexico", phone: "52", iso: "484" },
    { code: "MY", label: "Malaysia", phone: "60", iso: "458" },
    { code: "MZ", label: "Mozambique", phone: "258", iso: "508" },
    { code: "NA", label: "Namibia", phone: "264", iso: "516" },
    { code: "NC", label: "New Caledonia", phone: "687", iso: "540" },
    { code: "NE", label: "Niger", phone: "227", iso: "562" },
    { code: "NF", label: "Norfolk Island", phone: "672", iso: "574" },
    { code: "NG", label: "Nigeria", phone: "234", iso: "566" },
    { code: "NI", label: "Nicaragua", phone: "505", iso: "558" },
    { code: "NL", label: "Netherlands", phone: "31", iso: "" },
    { code: "NO", label: "Norway", phone: "47", iso: "578" },
    { code: "NP", label: "Nepal", phone: "977", iso: "524" },
    { code: "NR", label: "Nauru", phone: "674", iso: "520" },
    { code: "NU", label: "Niue", phone: "683", iso: "570" },
    { code: "NZ", label: "New Zealand", phone: "64", iso: "554" },
    { code: "OM", label: "Oman", phone: "968", iso: "512" },
    { code: "PA", label: "Panama", phone: "507", iso: "591" },
    { code: "PE", label: "Peru", phone: "51", iso: "604" },
    { code: "PF", label: "French Polynesia", phone: "689", iso: "258" },
    { code: "PG", label: "Papua New Guinea", phone: "675", iso: "598" },
    { code: "PH", label: "Philippines", phone: "63", iso: "608" },
    { code: "PK", label: "Pakistan", phone: "92", iso: "586" },
    { code: "PL", label: "Poland", phone: "48", iso: "616" },
    { code: "PM", label: "Saint Pierre and Miquelon", phone: "508", iso: "666" },
    { code: "PN", label: "Pitcairn", phone: "870", iso: "612" },
    { code: "PR", label: "Puerto Rico", phone: "1", iso: "630" },
    { code: "PS", label: "Palestine, State of", phone: "970", iso: "275" },
    { code: "PT", label: "Portugal", phone: "351", iso: "620" },
    { code: "PW", label: "Palau", phone: "680", iso: "585" },
    { code: "PY", label: "Paraguay", phone: "595", iso: "600" },
    { code: "QA", label: "Qatar", phone: "974", iso: "634" },
    { code: "RE", label: "Reunion", phone: "262", iso: "638" },
    { code: "RO", label: "Romania", phone: "40", iso: "642" },
    { code: "RS", label: "Serbia", phone: "381", iso: "688" },
    { code: "RU", label: "Russian Federation", phone: "7", iso: "643" },
    { code: "RW", label: "Rwanda", phone: "250", iso: "646" },
    { code: "SA", label: "Saudi Arabia", phone: "966", iso: "682" },
    { code: "SB", label: "Solomon Islands", phone: "677", iso: "090" },
    { code: "SC", label: "Seychelles", phone: "248", iso: "690" },
    { code: "SD", label: "Sudan", phone: "249", iso: "736" },
    { code: "SE", label: "Sweden", phone: "46", iso: "752" },
    { code: "SG", label: "Singapore", phone: "65", iso: "702" },
    { code: "SI", label: "Slovenia", phone: "386", iso: "654" },
    { code: "SJ", label: "Svalbard and Jan Mayen", phone: "47", iso: "744" },
    { code: "SK", label: "Slovakia", phone: "421", iso: "703" },
    { code: "SL", label: "Sierra Leone", phone: "232", iso: "694" },
    { code: "SM", label: "San Marino", phone: "378", iso: "674" },
    { code: "SN", label: "Senegal", phone: "221", iso: "686" },
    { code: "SO", label: "Somalia", phone: "252", iso: "706" },
    { code: "SR", label: "Suriname", phone: "597", iso: "740" },
    { code: "SS", label: "South Sudan", phone: "211", iso: "728" },
    { code: "ST", label: "Sao Tome and Principe", phone: "239", iso: "678" },
    { code: "SV", label: "El Salvador", phone: "503", iso: "222" },
    { code: "SX", label: "Sint Maarten (Dutch part)", phone: "1-721", iso: "534" },
    { code: "SY", label: "Syrian Arab Republic", phone: "963", iso: "760" },
    { code: "SZ", label: "Swaziland", phone: "268", iso: "748" },
    { code: "TC", label: "Turks and Caicos Islands", phone: "1-649", iso: "796" },
    { code: "TD", label: "Chad", phone: "235", iso: "148" },
    { code: "TF", label: "French Southern Territories", phone: "262", iso: "260" },
    { code: "TG", label: "Togo", phone: "228", iso: "768" },
    { code: "TH", label: "Thailand", phone: "66", iso: "764" },
    { code: "TJ", label: "Tajikistan", phone: "992", iso: "762" },
    { code: "TK", label: "Tokelau", phone: "690", iso: "772" },
    { code: "TL", label: "Timor-Leste", phone: "670", iso: "626" },
    { code: "TM", label: "Turkmenistan", phone: "993", iso: "795" },
    { code: "TN", label: "Tunisia", phone: "216", iso: "788" },
    { code: "TO", label: "Tonga", phone: "676", iso: "776" },
    { code: "TR", label: "Turkey", phone: "90", iso: "792" },
    { code: "TT", label: "Trinidad and Tobago", phone: "1-868", iso: "780" },
    { code: "TV", label: "Tuvalu", phone: "688", iso: "798" },
    { code: "TW", label: "Taiwan, Province of China", phone: "886", iso: "158" },
    { code: "TZ", label: "United Republic of Tanzania", phone: "255", iso: "834" },
    { code: "UA", label: "Ukraine", phone: "380", iso: "804" },
    { code: "UG", label: "Uganda", phone: "256", iso: "800" },
    {
        code: "US",
        label: "United States",
        phone: "1",
        suggested: true,
        iso: "840",
        semantics: "usa"
    },
    { code: "UY", label: "Uruguay", phone: "598", iso: "858" },
    { code: "UZ", label: "Uzbekistan", phone: "998", iso: "860" },
    { code: "VA", label: "Holy See (Vatican City State)", phone: "379", iso: "336" },
    { code: "VC", label: "Saint Vincent and the Grenadines", phone: "1-784", iso: "670" },
    { code: "VE", label: "Venezuela", phone: "58", iso: "862" },
    { code: "VG", label: "British Virgin Islands", phone: "1-284", iso: "092" },
    { code: "VI", label: "US Virgin Islands", phone: "1-340", iso: "850" },
    { code: "VN", label: "Vietnam", phone: "84", iso: "704" },
    { code: "VU", label: "Vanuatu", phone: "678", iso: "548" },
    { code: "WF", label: "Wallis and Futuna", phone: "681", iso: "876" },
    { code: "WS", label: "Samoa", phone: "685", iso: "882" },
    { code: "XK", label: "Kosovo", phone: "383", iso: "" },
    { code: "YE", label: "Yemen", phone: "967", iso: "887" },
    { code: "YT", label: "Mayotte", phone: "262", iso: "175" },
    { code: "ZA", label: "South Africa", phone: "27", iso: "710" },
    { code: "ZM", label: "Zambia", phone: "260", iso: "894" },
    { code: "ZW", label: "Zimbabwe", phone: "263", iso: "716" }
];
export default countries;

export const countriesWithNationalities = [
    {
        iso: "826",
        code: "GB",
        alpha_3_code: "GBR",
        label: "United Kingdom",
        nationality: "British, UK"
    },
    {
        iso: "4",
        code: "AF",
        alpha_3_code: "AFG",
        label: "Afghanistan",
        nationality: "Afghan"
    },
    {
        iso: "248",
        code: "AX",
        alpha_3_code: "ALA",
        label: "\u00c5land Islands",
        nationality: "\u00c5land Island"
    },
    {
        iso: "8",
        code: "AL",
        alpha_3_code: "ALB",
        label: "Albania",
        nationality: "Albanian"
    },
    {
        iso: "12",
        code: "DZ",
        alpha_3_code: "DZA",
        label: "Algeria",
        nationality: "Algerian"
    },
    {
        iso: "16",
        code: "AS",
        alpha_3_code: "ASM",
        label: "American Samoa",
        nationality: "American Samoan"
    },
    {
        iso: "20",
        code: "AD",
        alpha_3_code: "AND",
        label: "Andorra",
        nationality: "Andorran"
    },
    {
        iso: "24",
        code: "AO",
        alpha_3_code: "AGO",
        label: "Angola",
        nationality: "Angolan"
    },
    {
        iso: "660",
        code: "AI",
        alpha_3_code: "AIA",
        label: "Anguilla",
        nationality: "Anguillan"
    },
    {
        iso: "28",
        code: "AG",
        alpha_3_code: "ATG",
        label: "Antigua and Barbuda",
        nationality: "Antiguan or Barbudan"
    },
    {
        iso: "32",
        code: "AR",
        alpha_3_code: "ARG",
        label: "Argentina",
        nationality: "Argentine"
    },
    {
        iso: "51",
        code: "AM",
        alpha_3_code: "ARM",
        label: "Armenia",
        nationality: "Armenian"
    },
    {
        iso: "533",
        code: "AW",
        alpha_3_code: "ABW",
        label: "Aruba",
        nationality: "Aruban"
    },
    {
        iso: "36",
        code: "AU",
        alpha_3_code: "AUS",
        label: "Australia",
        nationality: "Australian"
    },
    {
        iso: "40",
        code: "AT",
        alpha_3_code: "AUT",
        label: "Austria",
        nationality: "Austrian"
    },
    {
        iso: "31",
        code: "AZ",
        alpha_3_code: "AZE",
        label: "Azerbaijan",
        nationality: "Azerbaijani, Azeri"
    },
    {
        iso: "44",
        code: "BS",
        alpha_3_code: "BHS",
        label: "Bahamas",
        nationality: "Bahamian"
    },
    {
        iso: "48",
        code: "BH",
        alpha_3_code: "BHR",
        label: "Bahrain",
        nationality: "Bahraini"
    },
    {
        iso: "50",
        code: "BD",
        alpha_3_code: "BGD",
        label: "Bangladesh",
        nationality: "Bangladeshi"
    },
    {
        iso: "52",
        code: "BB",
        alpha_3_code: "BRB",
        label: "Barbados",
        nationality: "Barbadian"
    },
    {
        iso: "112",
        code: "BY",
        alpha_3_code: "BLR",
        label: "Belarus",
        nationality: "Belarusian"
    },
    {
        iso: "56",
        code: "BE",
        alpha_3_code: "BEL",
        label: "Belgium",
        nationality: "Belgian"
    },
    {
        iso: "84",
        code: "BZ",
        alpha_3_code: "BLZ",
        label: "Belize",
        nationality: "Belizean"
    },
    {
        iso: "204",
        code: "BJ",
        alpha_3_code: "BEN",
        label: "Benin",
        nationality: "Beninese, Beninois"
    },
    {
        iso: "60",
        code: "BM",
        alpha_3_code: "BMU",
        label: "Bermuda",
        nationality: "Bermudian, Bermudan"
    },
    {
        iso: "64",
        code: "BT",
        alpha_3_code: "BTN",
        label: "Bhutan",
        nationality: "Bhutanese"
    },
    {
        iso: "68",
        code: "BO",
        alpha_3_code: "BOL",
        label: "Bolivia (Plurinational State of)",
        nationality: "Bolivian"
    },
    {
        iso: "70",
        code: "BA",
        alpha_3_code: "BIH",
        label: "Bosnia and Herzegovina",
        nationality: "Bosnian or Herzegovinian"
    },
    {
        iso: "72",
        code: "BW",
        alpha_3_code: "BWA",
        label: "Botswana",
        nationality: "Motswana, Botswanan"
    },
    {
        iso: "74",
        code: "BV",
        alpha_3_code: "BVT",
        label: "Bouvet Island",
        nationality: "Bouvet Island"
    },
    {
        iso: "76",
        code: "BR",
        alpha_3_code: "BRA",
        label: "Brazil",
        nationality: "Brazilian"
    },
    {
        iso: "86",
        code: "IO",
        alpha_3_code: "IOT",
        label: "British Indian Ocean Territory",
        nationality: "BIOT"
    },
    {
        iso: "96",
        code: "BN",
        alpha_3_code: "BRN",
        label: "Brunei Darussalam",
        nationality: "Bruneian"
    },
    {
        iso: "100",
        code: "BG",
        alpha_3_code: "BGR",
        label: "Bulgaria",
        nationality: "Bulgarian"
    },
    {
        iso: "854",
        code: "BF",
        alpha_3_code: "BFA",
        label: "Burkina Faso",
        nationality: "Burkinab\u00e9"
    },
    {
        iso: "108",
        code: "BI",
        alpha_3_code: "BDI",
        label: "Burundi",
        nationality: "Burundian"
    },
    {
        iso: "132",
        code: "CV",
        alpha_3_code: "CPV",
        label: "Cabo Verde",
        nationality: "Cabo Verdean"
    },
    {
        iso: "116",
        code: "KH",
        alpha_3_code: "KHM",
        label: "Cambodia",
        nationality: "Cambodian"
    },
    {
        iso: "120",
        code: "CM",
        alpha_3_code: "CMR",
        label: "Cameroon",
        nationality: "Cameroonian"
    },
    {
        iso: "124",
        code: "CA",
        alpha_3_code: "CAN",
        label: "Canada",
        nationality: "Canadian"
    },
    {
        iso: "136",
        code: "KY",
        alpha_3_code: "CYM",
        label: "Cayman Islands",
        nationality: "Caymanian"
    },
    {
        iso: "140",
        code: "CF",
        alpha_3_code: "CAF",
        label: "Central African Republic",
        nationality: "Central African"
    },
    {
        iso: "148",
        code: "TD",
        alpha_3_code: "TCD",
        label: "Chad",
        nationality: "Chadian"
    },
    {
        iso: "152",
        code: "CL",
        alpha_3_code: "CHL",
        label: "Chile",
        nationality: "Chilean"
    },
    {
        iso: "156",
        code: "CN",
        alpha_3_code: "CHN",
        label: "China",
        nationality: "Chinese"
    },
    {
        iso: "162",
        code: "CX",
        alpha_3_code: "CXR",
        label: "Christmas Island",
        nationality: "Christmas Island"
    },
    {
        iso: "166",
        code: "CC",
        alpha_3_code: "CCK",
        label: "Cocos (Keeling) Islands",
        nationality: "Cocos Island"
    },
    {
        iso: "170",
        code: "CO",
        alpha_3_code: "COL",
        label: "Colombia",
        nationality: "Colombian"
    },
    {
        iso: "174",
        code: "KM",
        alpha_3_code: "COM",
        label: "Comoros",
        nationality: "Comoran, Comorian"
    },
    {
        iso: "178",
        code: "CG",
        alpha_3_code: "COG",
        label: "Congo (Republic of the)",
        nationality: "Congolese"
    },
    {
        iso: "180",
        code: "CD",
        alpha_3_code: "COD",
        label: "Congo (Democratic Republic of the)",
        nationality: "Congolese"
    },
    {
        iso: "184",
        code: "CK",
        alpha_3_code: "COK",
        label: "Cook Islands",
        nationality: "Cook Island"
    },
    {
        iso: "188",
        code: "CR",
        alpha_3_code: "CRI",
        label: "Costa Rica",
        nationality: "Costa Rican"
    },
    {
        iso: "384",
        code: "CI",
        alpha_3_code: "CIV",
        label: "C\u00f4te d'Ivoire",
        nationality: "Ivorian"
    },
    {
        iso: "191",
        code: "HR",
        alpha_3_code: "HRV",
        label: "Croatia",
        nationality: "Croatian"
    },
    {
        iso: "192",
        code: "CU",
        alpha_3_code: "CUB",
        label: "Cuba",
        nationality: "Cuban"
    },
    {
        iso: "531",
        code: "CW",
        alpha_3_code: "CUW",
        label: "Cura\u00e7ao",
        nationality: "Cura\u00e7aoan"
    },
    {
        iso: "196",
        code: "CY",
        alpha_3_code: "CYP",
        label: "Cyprus",
        nationality: "Cypriot"
    },
    {
        iso: "203",
        code: "CZ",
        alpha_3_code: "CZE",
        label: "Czech Republic",
        nationality: "Czech"
    },
    {
        iso: "208",
        code: "DK",
        alpha_3_code: "DNK",
        label: "Denmark",
        nationality: "Danish"
    },
    {
        iso: "262",
        code: "DJ",
        alpha_3_code: "DJI",
        label: "Djibouti",
        nationality: "Djiboutian"
    },
    {
        iso: "212",
        code: "DM",
        alpha_3_code: "DMA",
        label: "Dominica",
        nationality: "Dominican"
    },
    {
        iso: "214",
        code: "DO",
        alpha_3_code: "DOM",
        label: "Dominican Republic",
        nationality: "Dominican"
    },
    {
        iso: "218",
        code: "EC",
        alpha_3_code: "ECU",
        label: "Ecuador",
        nationality: "Ecuadorian"
    },
    {
        iso: "818",
        code: "EG",
        alpha_3_code: "EGY",
        label: "Egypt",
        nationality: "Egyptian"
    },
    {
        iso: "222",
        code: "SV",
        alpha_3_code: "SLV",
        label: "El Salvador",
        nationality: "Salvadoran"
    },
    {
        iso: "226",
        code: "GQ",
        alpha_3_code: "GNQ",
        label: "Equatorial Guinea",
        nationality: "Equatorial Guinean, Equatoguinean"
    },
    {
        iso: "232",
        code: "ER",
        alpha_3_code: "ERI",
        label: "Eritrea",
        nationality: "Eritrean"
    },
    {
        iso: "233",
        code: "EE",
        alpha_3_code: "EST",
        label: "Estonia",
        nationality: "Estonian"
    },
    {
        iso: "231",
        code: "ET",
        alpha_3_code: "ETH",
        label: "Ethiopia",
        nationality: "Ethiopian"
    },
    {
        iso: "238",
        code: "FK",
        alpha_3_code: "FLK",
        label: "Falkland Islands (Malvinas)",
        nationality: "Falkland Island"
    },
    {
        iso: "234",
        code: "FO",
        alpha_3_code: "FRO",
        label: "Faroe Islands",
        nationality: "Faroese"
    },
    {
        iso: "242",
        code: "FJ",
        alpha_3_code: "FJI",
        label: "Fiji",
        nationality: "Fijian"
    },
    {
        iso: "246",
        code: "FI",
        alpha_3_code: "FIN",
        label: "Finland",
        nationality: "Finnish"
    },
    {
        iso: "250",
        code: "FR",
        alpha_3_code: "FRA",
        label: "France",
        nationality: "French"
    },
    {
        iso: "254",
        code: "GF",
        alpha_3_code: "GUF",
        label: "French Guiana",
        nationality: "French Guianese"
    },
    {
        iso: "258",
        code: "PF",
        alpha_3_code: "PYF",
        label: "French Polynesia",
        nationality: "French Polynesian"
    },
    {
        iso: "260",
        code: "TF",
        alpha_3_code: "ATF",
        label: "French Southern Territories",
        nationality: "French Southern Territories"
    },
    {
        iso: "266",
        code: "GA",
        alpha_3_code: "GAB",
        label: "Gabon",
        nationality: "Gabonese"
    },
    {
        iso: "270",
        code: "GM",
        alpha_3_code: "GMB",
        label: "Gambia",
        nationality: "Gambian"
    },
    {
        iso: "268",
        code: "GE",
        alpha_3_code: "GEO",
        label: "Georgia",
        nationality: "Georgian"
    },
    {
        iso: "276",
        code: "DE",
        alpha_3_code: "DEU",
        label: "Germany",
        nationality: "German"
    },
    {
        iso: "288",
        code: "GH",
        alpha_3_code: "GHA",
        label: "Ghana",
        nationality: "Ghanaian"
    },
    {
        iso: "292",
        code: "GI",
        alpha_3_code: "GIB",
        label: "Gibraltar",
        nationality: "Gibraltar"
    },
    {
        iso: "300",
        code: "GR",
        alpha_3_code: "GRC",
        label: "Greece",
        nationality: "Greek, Hellenic"
    },
    {
        iso: "304",
        code: "GL",
        alpha_3_code: "GRL",
        label: "Greenland",
        nationality: "Greenlandic"
    },
    {
        iso: "308",
        code: "GD",
        alpha_3_code: "GRD",
        label: "Grenada",
        nationality: "Grenadian"
    },
    {
        iso: "312",
        code: "GP",
        alpha_3_code: "GLP",
        label: "Guadeloupe",
        nationality: "Guadeloupe"
    },
    {
        iso: "316",
        code: "GU",
        alpha_3_code: "GUM",
        label: "Guam",
        nationality: "Guamanian, Guambat"
    },
    {
        iso: "320",
        code: "GT",
        alpha_3_code: "GTM",
        label: "Guatemala",
        nationality: "Guatemalan"
    },
    {
        iso: "831",
        code: "GG",
        alpha_3_code: "GGY",
        label: "Guernsey",
        nationality: "Channel Island"
    },
    {
        iso: "324",
        code: "GN",
        alpha_3_code: "GIN",
        label: "Guinea",
        nationality: "Guinean"
    },
    {
        iso: "624",
        code: "GW",
        alpha_3_code: "GNB",
        label: "Guinea-Bissau",
        nationality: "Bissau-Guinean"
    },
    {
        iso: "328",
        code: "GY",
        alpha_3_code: "GUY",
        label: "Guyana",
        nationality: "Guyanese"
    },
    {
        iso: "332",
        code: "HT",
        alpha_3_code: "HTI",
        label: "Haiti",
        nationality: "Haitian"
    },
    {
        iso: "334",
        code: "HM",
        alpha_3_code: "HMD",
        label: "Heard Island and McDonald Islands",
        nationality: "Heard Island or McDonald Islands"
    },
    {
        iso: "336",
        code: "VA",
        alpha_3_code: "VAT",
        label: "Vatican City State",
        nationality: "Vatican"
    },
    {
        iso: "340",
        code: "HN",
        alpha_3_code: "HND",
        label: "Honduras",
        nationality: "Honduran"
    },
    {
        iso: "344",
        code: "HK",
        alpha_3_code: "HKG",
        label: "Hong Kong",
        nationality: "Hong Kong, Hong Kongese"
    },
    {
        iso: "348",
        code: "HU",
        alpha_3_code: "HUN",
        label: "Hungary",
        nationality: "Hungarian, Magyar"
    },
    {
        iso: "352",
        code: "IS",
        alpha_3_code: "ISL",
        label: "Iceland",
        nationality: "Icelandic"
    },
    {
        iso: "356",
        code: "IN",
        alpha_3_code: "IND",
        label: "India",
        nationality: "Indian"
    },
    {
        iso: "360",
        code: "ID",
        alpha_3_code: "IDN",
        label: "Indonesia",
        nationality: "Indonesian"
    },
    {
        iso: "364",
        code: "IR",
        alpha_3_code: "IRN",
        label: "Iran",
        nationality: "Iranian, Persian"
    },
    {
        iso: "368",
        code: "IQ",
        alpha_3_code: "IRQ",
        label: "Iraq",
        nationality: "Iraqi"
    },
    {
        iso: "372",
        code: "IE",
        alpha_3_code: "IRL",
        label: "Ireland",
        nationality: "Irish"
    },
    {
        iso: "833",
        code: "IM",
        alpha_3_code: "IMN",
        label: "Isle of Man",
        nationality: "Manx"
    },
    {
        iso: "376",
        code: "IL",
        alpha_3_code: "ISR",
        label: "Israel",
        nationality: "Israeli"
    },
    {
        iso: "380",
        code: "IT",
        alpha_3_code: "ITA",
        label: "Italy",
        nationality: "Italian"
    },
    {
        iso: "388",
        code: "JM",
        alpha_3_code: "JAM",
        label: "Jamaica",
        nationality: "Jamaican"
    },
    {
        iso: "392",
        code: "JP",
        alpha_3_code: "JPN",
        label: "Japan",
        nationality: "Japanese"
    },
    {
        iso: "832",
        code: "JE",
        alpha_3_code: "JEY",
        label: "Jersey",
        nationality: "Channel Island"
    },
    {
        iso: "400",
        code: "JO",
        alpha_3_code: "JOR",
        label: "Jordan",
        nationality: "Jordanian"
    },
    {
        iso: "398",
        code: "KZ",
        alpha_3_code: "KAZ",
        label: "Kazakhstan",
        nationality: "Kazakhstani, Kazakh"
    },
    {
        iso: "404",
        code: "KE",
        alpha_3_code: "KEN",
        label: "Kenya",
        nationality: "Kenyan"
    },
    {
        iso: "296",
        code: "KI",
        alpha_3_code: "KIR",
        label: "Kiribati",
        nationality: "I-Kiribati"
    },
    {
        iso: "408",
        code: "KP",
        alpha_3_code: "PRK",
        label: "Korea (Democratic People's Republic of)",
        nationality: "North Korean"
    },
    {
        iso: "410",
        code: "KR",
        alpha_3_code: "KOR",
        label: "Korea (Republic of)",
        nationality: "South Korean"
    },
    {
        iso: "414",
        code: "KW",
        alpha_3_code: "KWT",
        label: "Kuwait",
        nationality: "Kuwaiti"
    },
    {
        iso: "417",
        code: "KG",
        alpha_3_code: "KGZ",
        label: "Kyrgyzstan",
        nationality: "Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz"
    },
    {
        iso: "418",
        code: "LA",
        alpha_3_code: "LAO",
        label: "Lao People's Democratic Republic",
        nationality: "Lao, Laotian"
    },
    {
        iso: "428",
        code: "LV",
        alpha_3_code: "LVA",
        label: "Latvia",
        nationality: "Latvian"
    },
    {
        iso: "422",
        code: "LB",
        alpha_3_code: "LBN",
        label: "Lebanon",
        nationality: "Lebanese"
    },
    {
        iso: "426",
        code: "LS",
        alpha_3_code: "LSO",
        label: "Lesotho",
        nationality: "Basotho"
    },
    {
        iso: "430",
        code: "LR",
        alpha_3_code: "LBR",
        label: "Liberia",
        nationality: "Liberian"
    },
    {
        iso: "434",
        code: "LY",
        alpha_3_code: "LBY",
        label: "Libya",
        nationality: "Libyan"
    },
    {
        iso: "438",
        code: "LI",
        alpha_3_code: "LIE",
        label: "Liechtenstein",
        nationality: "Liechtenstein"
    },
    {
        iso: "440",
        code: "LT",
        alpha_3_code: "LTU",
        label: "Lithuania",
        nationality: "Lithuanian"
    },
    {
        iso: "442",
        code: "LU",
        alpha_3_code: "LUX",
        label: "Luxembourg",
        nationality: "Luxembourg, Luxembourgish"
    },
    {
        iso: "446",
        code: "MO",
        alpha_3_code: "MAC",
        label: "Macao",
        nationality: "Macanese, Chinese"
    },
    {
        iso: "807",
        code: "MK",
        alpha_3_code: "MKD",
        label: "Macedonia (the former Yugoslav Republic of)",
        nationality: "Macedonian"
    },
    {
        iso: "450",
        code: "MG",
        alpha_3_code: "MDG",
        label: "Madagascar",
        nationality: "Malagasy"
    },
    {
        iso: "454",
        code: "MW",
        alpha_3_code: "MWI",
        label: "Malawi",
        nationality: "Malawian"
    },
    {
        iso: "458",
        code: "MY",
        alpha_3_code: "MYS",
        label: "Malaysia",
        nationality: "Malaysian"
    },
    {
        iso: "462",
        code: "MV",
        alpha_3_code: "MDV",
        label: "Maldives",
        nationality: "Maldivian"
    },
    {
        iso: "466",
        code: "ML",
        alpha_3_code: "MLI",
        label: "Mali",
        nationality: "Malian, Malinese"
    },
    {
        iso: "470",
        code: "MT",
        alpha_3_code: "MLT",
        label: "Malta",
        nationality: "Maltese"
    },
    {
        iso: "584",
        code: "MH",
        alpha_3_code: "MHL",
        label: "Marshall Islands",
        nationality: "Marshallese"
    },
    {
        iso: "474",
        code: "MQ",
        alpha_3_code: "MTQ",
        label: "Martinique",
        nationality: "Martiniquais, Martinican"
    },
    {
        iso: "478",
        code: "MR",
        alpha_3_code: "MRT",
        label: "Mauritania",
        nationality: "Mauritanian"
    },
    {
        iso: "480",
        code: "MU",
        alpha_3_code: "MUS",
        label: "Mauritius",
        nationality: "Mauritian"
    },
    {
        iso: "175",
        code: "YT",
        alpha_3_code: "MYT",
        label: "Mayotte",
        nationality: "Mahoran"
    },
    {
        iso: "484",
        code: "MX",
        alpha_3_code: "MEX",
        label: "Mexico",
        nationality: "Mexican"
    },
    {
        iso: "583",
        code: "FM",
        alpha_3_code: "FSM",
        label: "Micronesia (Federated States of)",
        nationality: "Micronesian"
    },
    {
        iso: "498",
        code: "MD",
        alpha_3_code: "MDA",
        label: "Moldova (Republic of)",
        nationality: "Moldovan"
    },
    {
        iso: "492",
        code: "MC",
        alpha_3_code: "MCO",
        label: "Monaco",
        nationality: "Mon\u00e9gasque, Monacan"
    },
    {
        iso: "496",
        code: "MN",
        alpha_3_code: "MNG",
        label: "Mongolia",
        nationality: "Mongolian"
    },
    {
        iso: "499",
        code: "ME",
        alpha_3_code: "MNE",
        label: "Montenegro",
        nationality: "Montenegrin"
    },
    {
        iso: "500",
        code: "MS",
        alpha_3_code: "MSR",
        label: "Montserrat",
        nationality: "Montserratian"
    },
    {
        iso: "504",
        code: "MA",
        alpha_3_code: "MAR",
        label: "Morocco",
        nationality: "Moroccan"
    },
    {
        iso: "508",
        code: "MZ",
        alpha_3_code: "MOZ",
        label: "Mozambique",
        nationality: "Mozambican"
    },
    {
        iso: "104",
        code: "MM",
        alpha_3_code: "MMR",
        label: "Myanmar",
        nationality: "Burmese"
    },
    {
        iso: "516",
        code: "NA",
        alpha_3_code: "NAM",
        label: "Namibia",
        nationality: "Namibian"
    },
    {
        iso: "520",
        code: "NR",
        alpha_3_code: "NRU",
        label: "Nauru",
        nationality: "Nauruan"
    },
    {
        iso: "524",
        code: "NP",
        alpha_3_code: "NPL",
        label: "Nepal",
        nationality: "Nepali, Nepalese"
    },
    {
        iso: "528",
        code: "NL",
        alpha_3_code: "NLD",
        label: "Netherlands",
        nationality: "Dutch, Netherlandic"
    },
    {
        iso: "540",
        code: "NC",
        alpha_3_code: "NCL",
        label: "New Caledonia",
        nationality: "New Caledonian"
    },
    {
        iso: "554",
        code: "NZ",
        alpha_3_code: "NZL",
        label: "New Zealand",
        nationality: "New Zealand, NZ"
    },
    {
        iso: "558",
        code: "NI",
        alpha_3_code: "NIC",
        label: "Nicaragua",
        nationality: "Nicaraguan"
    },
    {
        iso: "562",
        code: "NE",
        alpha_3_code: "NER",
        label: "Niger",
        nationality: "Nigerien"
    },
    {
        iso: "566",
        code: "NG",
        alpha_3_code: "NGA",
        label: "Nigeria",
        nationality: "Nigerian"
    },
    {
        iso: "570",
        code: "NU",
        alpha_3_code: "NIU",
        label: "Niue",
        nationality: "Niuean"
    },
    {
        iso: "574",
        code: "NF",
        alpha_3_code: "NFK",
        label: "Norfolk Island",
        nationality: "Norfolk Island"
    },
    {
        iso: "580",
        code: "MP",
        alpha_3_code: "MNP",
        label: "Northern Mariana Islands",
        nationality: "Northern Marianan"
    },
    {
        iso: "578",
        code: "NO",
        alpha_3_code: "NOR",
        label: "Norway",
        nationality: "Norwegian"
    },
    {
        iso: "512",
        code: "OM",
        alpha_3_code: "OMN",
        label: "Oman",
        nationality: "Omani"
    },
    {
        iso: "586",
        code: "PK",
        alpha_3_code: "PAK",
        label: "Pakistan",
        nationality: "Pakistani"
    },
    {
        iso: "585",
        code: "PW",
        alpha_3_code: "PLW",
        label: "Palau",
        nationality: "Palauan"
    },
    {
        iso: "275",
        code: "PS",
        alpha_3_code: "PSE",
        label: "Palestine, State of",
        nationality: "Palestinian"
    },
    {
        iso: "591",
        code: "PA",
        alpha_3_code: "PAN",
        label: "Panama",
        nationality: "Panamanian"
    },
    {
        iso: "598",
        code: "PG",
        alpha_3_code: "PNG",
        label: "Papua New Guinea",
        nationality: "Papua New Guinean, Papuan"
    },
    {
        iso: "600",
        code: "PY",
        alpha_3_code: "PRY",
        label: "Paraguay",
        nationality: "Paraguayan"
    },
    {
        iso: "604",
        code: "PE",
        alpha_3_code: "PER",
        label: "Peru",
        nationality: "Peruvian"
    },
    {
        iso: "608",
        code: "PH",
        alpha_3_code: "PHL",
        label: "Philippines",
        nationality: "Philippine, Filipino"
    },
    {
        iso: "612",
        code: "PN",
        alpha_3_code: "PCN",
        label: "Pitcairn",
        nationality: "Pitcairn Island"
    },
    {
        iso: "616",
        code: "PL",
        alpha_3_code: "POL",
        label: "Poland",
        nationality: "Polish"
    },
    {
        iso: "620",
        code: "PT",
        alpha_3_code: "PRT",
        label: "Portugal",
        nationality: "Portuguese"
    },
    {
        iso: "630",
        code: "PR",
        alpha_3_code: "PRI",
        label: "Puerto Rico",
        nationality: "Puerto Rican"
    },
    {
        iso: "634",
        code: "QA",
        alpha_3_code: "QAT",
        label: "Qatar",
        nationality: "Qatari"
    },
    {
        iso: "638",
        code: "RE",
        alpha_3_code: "REU",
        label: "R\u00e9union",
        nationality: "R\u00e9unionese, R\u00e9unionnais"
    },
    {
        iso: "642",
        code: "RO",
        alpha_3_code: "ROU",
        label: "Romania",
        nationality: "Romanian"
    },
    {
        iso: "643",
        code: "RU",
        alpha_3_code: "RUS",
        label: "Russian Federation",
        nationality: "Russian"
    },
    {
        iso: "646",
        code: "RW",
        alpha_3_code: "RWA",
        label: "Rwanda",
        nationality: "Rwandan"
    },
    {
        iso: "652",
        code: "BL",
        alpha_3_code: "BLM",
        label: "Saint Barth\u00e9lemy",
        nationality: "Barth\u00e9lemois"
    },
    {
        iso: "654",
        code: "SH",
        alpha_3_code: "SHN",
        label: "Saint Helena, Ascension and Tristan da Cunha",
        nationality: "Saint Helenian"
    },
    {
        iso: "659",
        code: "KN",
        alpha_3_code: "KNA",
        label: "Saint Kitts and Nevis",
        nationality: "Kittitian or Nevisian"
    },
    {
        iso: "662",
        code: "LC",
        alpha_3_code: "LCA",
        label: "Saint Lucia",
        nationality: "Saint Lucian"
    },
    {
        iso: "666",
        code: "PM",
        alpha_3_code: "SPM",
        label: "Saint Pierre and Miquelon",
        nationality: "Saint-Pierrais or Miquelonnais"
    },
    {
        iso: "670",
        code: "VC",
        alpha_3_code: "VCT",
        label: "Saint Vincent and the Grenadines",
        nationality: "Saint Vincentian, Vincentian"
    },
    {
        iso: "882",
        code: "WS",
        alpha_3_code: "WSM",
        label: "Samoa",
        nationality: "Samoan"
    },
    {
        iso: "674",
        code: "SM",
        alpha_3_code: "SMR",
        label: "San Marino",
        nationality: "Sammarinese"
    },
    {
        iso: "678",
        code: "ST",
        alpha_3_code: "STP",
        label: "Sao Tome and Principe",
        nationality: "S\u00e3o Tom\u00e9an"
    },
    {
        iso: "682",
        code: "SA",
        alpha_3_code: "SAU",
        label: "Saudi Arabia",
        nationality: "Saudi, Saudi Arabian"
    },
    {
        iso: "686",
        code: "SN",
        alpha_3_code: "SEN",
        label: "Senegal",
        nationality: "Senegalese"
    },
    {
        iso: "688",
        code: "RS",
        alpha_3_code: "SRB",
        label: "Serbia",
        nationality: "Serbian"
    },
    {
        iso: "690",
        code: "SC",
        alpha_3_code: "SYC",
        label: "Seychelles",
        nationality: "Seychellois"
    },
    {
        iso: "694",
        code: "SL",
        alpha_3_code: "SLE",
        label: "Sierra Leone",
        nationality: "Sierra Leonean"
    },
    {
        iso: "702",
        code: "SG",
        alpha_3_code: "SGP",
        label: "Singapore",
        nationality: "Singaporean"
    },
    {
        iso: "534",
        code: "SX",
        alpha_3_code: "SXM",
        label: "Sint Maarten (Dutch part)",
        nationality: "Sint Maarten"
    },
    {
        iso: "703",
        code: "SK",
        alpha_3_code: "SVK",
        label: "Slovakia",
        nationality: "Slovak"
    },
    {
        iso: "705",
        code: "SI",
        alpha_3_code: "SVN",
        label: "Slovenia",
        nationality: "Slovenian, Slovene"
    },
    {
        iso: "90",
        code: "SB",
        alpha_3_code: "SLB",
        label: "Solomon Islands",
        nationality: "Solomon Island"
    },
    {
        iso: "706",
        code: "SO",
        alpha_3_code: "SOM",
        label: "Somalia",
        nationality: "Somali, Somalian"
    },
    {
        iso: "710",
        code: "ZA",
        alpha_3_code: "ZAF",
        label: "South Africa",
        nationality: "South African"
    },
    {
        iso: "239",
        code: "GS",
        alpha_3_code: "SGS",
        label: "South Georgia and the South Sandwich Islands",
        nationality: "South Georgia or South Sandwich Islands"
    },
    {
        iso: "728",
        code: "SS",
        alpha_3_code: "SSD",
        label: "South Sudan",
        nationality: "South Sudanese"
    },
    {
        iso: "724",
        code: "ES",
        alpha_3_code: "ESP",
        label: "Spain",
        nationality: "Spanish"
    },
    {
        iso: "144",
        code: "LK",
        alpha_3_code: "LKA",
        label: "Sri Lanka",
        nationality: "Sri Lankan"
    },
    {
        iso: "729",
        code: "SD",
        alpha_3_code: "SDN",
        label: "Sudan",
        nationality: "Sudanese"
    },
    {
        iso: "740",
        code: "SR",
        alpha_3_code: "SUR",
        label: "Suriname",
        nationality: "Surinamese"
    },
    {
        iso: "744",
        code: "SJ",
        alpha_3_code: "SJM",
        label: "Svalbard and Jan Mayen",
        nationality: "Svalbard"
    },
    {
        iso: "748",
        code: "SZ",
        alpha_3_code: "SWZ",
        label: "Swaziland",
        nationality: "Swazi"
    },
    {
        iso: "752",
        code: "SE",
        alpha_3_code: "SWE",
        label: "Sweden",
        nationality: "Swedish"
    },
    {
        iso: "756",
        code: "CH",
        alpha_3_code: "CHE",
        label: "Switzerland",
        nationality: "Swiss"
    },
    {
        iso: "760",
        code: "SY",
        alpha_3_code: "SYR",
        label: "Syrian Arab Republic",
        nationality: "Syrian"
    },
    {
        iso: "158",
        code: "TW",
        alpha_3_code: "TWN",
        label: "Taiwan, Province of China",
        nationality: "Chinese, Taiwanese"
    },
    {
        iso: "762",
        code: "TJ",
        alpha_3_code: "TJK",
        label: "Tajikistan",
        nationality: "Tajikistani"
    },
    {
        iso: "834",
        code: "TZ",
        alpha_3_code: "TZA",
        label: "Tanzania, United Republic of",
        nationality: "Tanzanian"
    },
    {
        iso: "764",
        code: "TH",
        alpha_3_code: "THA",
        label: "Thailand",
        nationality: "Thai"
    },
    {
        iso: "626",
        code: "TL",
        alpha_3_code: "TLS",
        label: "Timor-Leste",
        nationality: "Timorese"
    },
    {
        iso: "768",
        code: "TG",
        alpha_3_code: "TGO",
        label: "Togo",
        nationality: "Togolese"
    },
    {
        iso: "772",
        code: "TK",
        alpha_3_code: "TKL",
        label: "Tokelau",
        nationality: "Tokelauan"
    },
    {
        iso: "776",
        code: "TO",
        alpha_3_code: "TON",
        label: "Tonga",
        nationality: "Tongan"
    },
    {
        iso: "780",
        code: "TT",
        alpha_3_code: "TTO",
        label: "Trinidad and Tobago",
        nationality: "Trinidadian or Tobagonian"
    },
    {
        iso: "788",
        code: "TN",
        alpha_3_code: "TUN",
        label: "Tunisia",
        nationality: "Tunisian"
    },
    {
        iso: "792",
        code: "TR",
        alpha_3_code: "TUR",
        label: "Turkey",
        nationality: "Turkish"
    },
    {
        iso: "795",
        code: "TM",
        alpha_3_code: "TKM",
        label: "Turkmenistan",
        nationality: "Turkmen"
    },
    {
        iso: "796",
        code: "TC",
        alpha_3_code: "TCA",
        label: "Turks and Caicos Islands",
        nationality: "Turks and Caicos Island"
    },
    {
        iso: "798",
        code: "TV",
        alpha_3_code: "TUV",
        label: "Tuvalu",
        nationality: "Tuvaluan"
    },
    {
        iso: "800",
        code: "UG",
        alpha_3_code: "UGA",
        label: "Uganda",
        nationality: "Ugandan"
    },
    {
        iso: "804",
        code: "UA",
        alpha_3_code: "UKR",
        label: "Ukraine",
        nationality: "Ukrainian"
    },
    {
        iso: "784",
        code: "AE",
        alpha_3_code: "ARE",
        label: "United Arab Emirates",
        nationality: "Emirati, Emirian, Emiri"
    },

    {
        iso: "581",
        code: "UM",
        alpha_3_code: "UMI",
        label: "United States Minor Outlying Islands",
        nationality: "American"
    },
    {
        iso: "840",
        code: "US",
        alpha_3_code: "USA",
        label: "United States of America",
        nationality: "American",
        semantics: 'usa',
    },
    {
        iso: "858",
        code: "UY",
        alpha_3_code: "URY",
        label: "Uruguay",
        nationality: "Uruguayan"
    },
    {
        iso: "860",
        code: "UZ",
        alpha_3_code: "UZB",
        label: "Uzbekistan",
        nationality: "Uzbekistani, Uzbek"
    },
    {
        iso: "548",
        code: "VU",
        alpha_3_code: "VUT",
        label: "Vanuatu",
        nationality: "Ni-Vanuatu, Vanuatuan"
    },
    {
        iso: "862",
        code: "VE",
        alpha_3_code: "VEN",
        label: "Venezuela (Bolivarian Republic of)",
        nationality: "Venezuelan"
    },
    {
        iso: "704",
        code: "VN",
        alpha_3_code: "VNM",
        label: "Vietnam",
        nationality: "Vietnamese"
    },
    {
        iso: "92",
        code: "VG",
        alpha_3_code: "VGB",
        label: "Virgin Islands (British)",
        nationality: "British Virgin Island"
    },
    {
        iso: "850",
        code: "VI",
        alpha_3_code: "VIR",
        label: "Virgin Islands (U.S.)",
        nationality: "U.S. Virgin Island"
    },
    {
        iso: "876",
        code: "WF",
        alpha_3_code: "WLF",
        label: "Wallis and Futuna",
        nationality: "Wallis and Futuna, Wallisian or Futunan"
    },
    {
        iso: "887",
        code: "YE",
        alpha_3_code: "YEM",
        label: "Yemen",
        nationality: "Yemeni"
    },
    {
        iso: "894",
        code: "ZM",
        alpha_3_code: "ZMB",
        label: "Zambia",
        nationality: "Zambian"
    },
    {
        iso: "716",
        code: "ZW",
        alpha_3_code: "ZWE",
        label: "Zimbabwe",
        nationality: "Zimbabwean"
    }
];
