import React from 'react';
import * as data from './data';

import { useStyles } from './styles';

function CardTermsAgreement() {
  const classes = useStyles();

  const loopOverLists = (array) =>
    array.map((d) => {
      if (d.index === '1.2')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseOnePartTwo}
          </p>
        );
      if (d.index === '5.10')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseFivePartTen}
          </p>
        );
      if (d.key === '5.10.1')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseFivePartTenO}
          </p>
        );
      if (d.key === '5.14.3')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseFivePartFourteenThree}
          </p>
        );
      if (d.key === '11.3')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseElevenPartThree}
          </p>
        );

      if (d.key === '11.3.2')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseElevenPartThreeTwo}
          </p>
        );
      if (d.key === '11.3.3')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseElevenPartThreeThree}
          </p>
        );
      if (d.key === '11.3.4')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseElevenPartThreeFour}
          </p>
        );
      if (d.key === '11.3.5')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseElevenPartThreeFive}
          </p>
        );
      if (d.key === '16.2')
        return (
          <p key={d.key}>
            <span className={classes.serialNumber}>{d.index} </span>
            {data.clauseSixteenPartTwo}
          </p>
        );
      return (
        <p key={d.key}>
          <span className={classes.serialNumber}>{d.index} </span> {d.text}
        </p>
      );
    });

  const nestedList = (list) =>
    list.map((l) =>
      l.key === '15.1.0' ? (
        <li key={l.key}>{data.clauseFifteenPartOne}</li>
      ) : (
        <li key={l.key} className={classes.listItem}>
          {l.text}
        </li>
      )
    );

  return (
    <>
      <div>
        <h2>Definitions</h2>
        {data.definitions}
      </div>

      <div>
        <h2>1. INFORMATION ON WHO WE ARE AND THIS AGREEMENT</h2>
        {loopOverLists(data.infoWho)}

        {/* todo :  links to be added */}
        <p>
          <span className={classes.serialNumber}>Website Privacy Notice</span>-
          [link TBC when website is live]
        </p>
        <p>
          <span className={classes.serialNumber}>
            Complaints Policy for Website & App
          </span>
          - [link TBC when website is live]
        </p>
        <p>
          <span className={classes.serialNumber}>Dormant Policy</span> - [link
          TBC when website is live]
        </p>
        <p>
          <span className={classes.serialNumber}>Refund Policy</span> - [link
          TBC when website is live]
        </p>
        <p>You must read the policies before entering the agreement with us.</p>
      </div>

      <div>
        <h2>2. CARDS</h2>
        {loopOverLists(data.cards)}
      </div>

      <div>
        <h2>3. IDENTIFICATION REQUIRED FOR PURCHASE OF CARDS</h2>
        {loopOverLists(data.identification)}
      </div>

      <div>
        <h2>4. FEES AND CHARGES</h2>
        {loopOverLists(data.charges)}
      </div>

      <div>
        <h2>5. HOW TO USE THE CARD</h2>
        {loopOverLists(data.usage)}
      </div>

      <div>
        <h2>6. RESTRICTIONS ON USE OF CARD</h2>
        {loopOverLists(data.restrictions1)}
        <ul>{nestedList(data.partSixAFD)}</ul>
        {loopOverLists(data.restrictions2)}
      </div>

      <div>
        <h2>7. MANAGING YOUR CARD</h2>
        {loopOverLists(data.manageCard1)}
        <ul>{nestedList(data.partSevenGrounds)}</ul>
        {loopOverLists(data.manageCard2)}
      </div>

      <div>
        <h2>8. EXPIRY OF THE CARD</h2>
        {loopOverLists(data.expiry1)}
        <ul>{nestedList(data.partEightConditions)}</ul>
        {loopOverLists(data.expiry2)}
      </div>

      <div>
        <h2>9. COOLING OFF AND REDEMPTION PROCEDURE</h2>
        {loopOverLists(data.redemption)}
      </div>

      <div>
        <h2>10. TERMINATION OF THIS AGREEMENT</h2>
        {loopOverLists(data.termination)}
      </div>

      <div>
        <h2>11. KEEPING YOUR CARD AND DETAILS SAFE</h2>
        {loopOverLists(data.cardSafe)}
      </div>

      <div>
        <h2>12. LOST, STOLEN OR DAMAGED CARDS</h2>
        {loopOverLists(data.lostDamage)}
      </div>

      <div>
        <h2>13. PURCHASES FROM RETAILERS</h2>
        {loopOverLists(data.retailers)}
      </div>

      <div>
        <h2>14. TRANSACTION DISPUTES</h2>
        {loopOverLists(data.disputes)}
      </div>

      <div>
        <h2>15.CUSTOMER SERVICES</h2>
        {loopOverLists(data.customerService1)}
        <ul>{nestedList(data.part15)}</ul>
        {loopOverLists(data.customerService2)}
      </div>

      <div>
        <h2>16. COMPLAINTS</h2>
        {loopOverLists(data.complaints1)}
        <ul>{nestedList(data.part4)}</ul>
        {loopOverLists(data.complaints2)}
        <ul>{nestedList(data.part6)}</ul>

        <p>
          <span className={classes.serialNumber}>16.7</span> Should your
          complaint refer specifically to issues associated with the Payment
          Services Directive (PSD) or the Electronic Money Directive (EMD) the
          following timetable will apply:
        </p>
        <ul>{nestedList(data.part7)}</ul>

        {loopOverLists(data.complaints3)}
      </div>

      <div>
        <h2>17. LIMITATION OF LIABILITY</h2>
        {loopOverLists(data.liability)}
      </div>

      <div>
        <h2>18. YOUR PERSONAL INFORMATION</h2>
        {loopOverLists(data.personalInfo)}
      </div>

      <div>
        <h2>19. CHANGES TO THE AGREEMENT</h2>
        {loopOverLists(data.changes)}
      </div>

      <div>
        <h2>20. LAW AND COURTS</h2>
        {loopOverLists(data.laws)}
      </div>

      <div>
        <h2>21. ASSIGNMENT</h2>
        {loopOverLists(data.assignment)}
      </div>

      <div>
        <h2>22. SEVERABILITY CLAUSE</h2>

        <p>
          If any term or provision of this Agreement is found to be unlawful or
          unenforceable, in whole or in part, pursuant to any law (or
          corresponding principle), said term or provision (or part thereof)
          shall not be deemed part of the Agreement to that extent, without
          prejudice to the validity and enforceability of the remainder of the
          Agreement. In such a case, the contracting parties shall undertake,
          taking into account the principle of good faith, to replace the
          invalid term or provision with a valid term or provision, which comes
          as close as possible to the meaning and purpose of the invalid term or
          provision, and which can be assumed to have been agreed by the parties
          at the time of conclusion of the Agreement, had they known or been
          able to foresee its invalidity or nullity.
        </p>
      </div>
      {/* agreement ends here */}
    </>
  );
}

export default CardTermsAgreement;
