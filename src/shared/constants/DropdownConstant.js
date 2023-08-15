const BusinessTypeList = [
    { name: 'Private Limited Company' },
    { name: 'Limited Liability Partnership' },
    { name: 'Sole Proprietorship' },
    { name: 'Partnerships' },
    { name: 'Cooperative' },
    { name: 'Non-profit Organisation' }
];
const NatureOfBusinessList = [
    {
        name: 'E-Commerce',
        synonyms: 'ecommerce; electronic commerce; ecom; shopify; dropshipping; store; shop; eshop; brand; amazon; fba,'
    },
    {
        name: 'Influencer/Influence Marketing',
        synonyms: 'Influence Marketing; influ; instagram; social media; tik tok; snapchat'
    },
    {
        name: 'Coaching Facebook/Google ads ',
        synonyms: 'Coach; facebook ads; google ads; snap ads; formation; mentor; trainer'
    },
    {
        name: 'Consulting Facebook/Google ads',
        synonyms: 'Coach; facebook ads; google ads; snap ads; media buyer; econsulting'
    },
    {
        name: 'Inheritance (supporting documentation)',
        synonyms: 'Youtube; channed; twitch; livestream; streamer;'
    },
    {
        name: 'Membership Websites',
        synonyms: 'website; content; blog; Thinkific; formation; training'
    },
    { name: 'Membership Programs', synonyms: 'Loyalty; reward' }
];

const SourceOfFundList = [
    { name: 'Savings' },
    { name: 'Release of pension' },
    { name: 'Sale of shares' },
    { name: 'Sale of another property' },
    { name: 'Inheritance' },
    { name: 'Dividends from a UK company' },
    { name: 'Lottery/gambling winnings' },
    { name: 'Compensation award' },
    { name: 'Gift from a relative' }
];

const SourceOfWealthList = [{ name: 'Inheritance' }, { name: 'Investments' }, { name: 'Ownership of a business' }, { name: 'Employment' }];
export { BusinessTypeList, SourceOfFundList, SourceOfWealthList, NatureOfBusinessList };
