import Link from "next/link";
import Head from "../components/head";
import InsuranceList from "../components/insurance_list";
import Router from "next/router";
import GlobalStyles from "../styles/global_styles";
import insuranceListItems from "../data/insurance_items";

const title = "My Insurance";

const common = (
  <div>
    <Head title={title} />
    <GlobalStyles />
  </div>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: insuranceListItems.items };
  }

  remove(index) {
    insuranceListItems.items.splice(index, 1);
    this.setState({ items: insuranceListItems.items });
  }

  render() {
    if (!this.state.items.length) {
      return (
        <div>
          {common}
          <div className="brand">
            <div className="name">Mysurance</div>
            <div className="tagline">safety first</div>
            </div>
          <div className="noInsurance">
            <div className="noInsurance-text">No insurance found 😱</div>
            <Link href="/add">
              <a className="addInsuranceButton">Add insurance</a>
            </Link>
          </div>
          <style jsx>{`
            .brand {
              font-size: 2em;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .name {
              font-style: italic;
            }
            .tagline {
              margin: 0.2em 0 2em;
              font-size: 0.5em;
            }
            .noInsurance {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-size: 2em;
            }

            @keyframes noo {
              0% {
                color: white;
                transform: scale(0, 0) rotate(0turn);
              }
              70% {
                color: grey;
                transform: scale(1.5, 1.5) rotate(-0.05turn);
              }
              100% {
                color: black;
                transform: scale(1, 1) rotate(0turn);
              }
            }

            .noInsurance-text {
              animation-name: noo;
              animation-duration: 1.5s;
              text-align: center;
              font-size: 0.9em;
            }

            .addInsuranceButton {
              margin: 0 0 8em;
            }
          `}</style>
        </div>
      );
    }
    return (
      <div>
        {common}
        <Link href="/add">
          <a className="addMore">Add</a>
        </Link>
        <h1>My Insurance</h1>
        <InsuranceList items={this.state.items} remove={a => this.remove(a)} />
        <style jsx>{`
          .addMore {
            display: flex;
            justify-content: flex-end;
          }
        `}</style>
      </div>
    );
  }
}
