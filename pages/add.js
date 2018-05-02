import "isomorphic-unfetch";
import Head from "../components/head";
import AddInsurance from "../components/add_insurance";
import insuranceListItems from "../data/insurance_items";
import Router from "next/router";
import Link from "next/link";
import GlobalStyles from "../styles/global_styles";

Router.onRouteChangeComplete = url => {
  window.scrollTo(0, 0);
};

const wikiLink =
  "https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*";
let fetching = false;

function getCats(json) {
  return json.query.categorymembers.map(item => {
    item.title = item.title.replace("Category:", "");
    return item;
  });
}

function isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], json: null };
    this.trackScrolling = this.trackScrolling.bind(this);
  }

  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(wikiLink);
    const json = await res.json();
    const categories = getCats(json);
    return { categories: categories, json: json };
  }

  addItem(item) {
    let max;
    if (!insuranceListItems.items.length) {
      max = 0;
    } else {
      max = insuranceListItems.items.reduce(function(prev, current) {
        return prev.id > current.id ? prev : current;
      }).id;
    }

    insuranceListItems.items.unshift({ id: max + 1, categoryName: item });

    Router.push("/");
    return insuranceListItems.items;
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories, json: this.props.json });
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    this.stopTracking();
  }

  stopTracking() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  async trackScrolling() {
    const wrappedElement = document.getElementsByClassName("insuranceItems")[0];
    const props = this.props.json;
    if (isBottom(wrappedElement)) {
      if (!fetching && this.state.json.continue) {
        fetching = true;
        const res = await fetch(
          `${wikiLink}&continue=${props.continue.continue}&cmcontinue=${props
            .continue.cmcontinue}`
        );
        const json = await res.json();
        const categories = getCats(json);
        this.setState({
          categories: this.state.categories.concat(categories),
          json: json
        });
        fetching = false;
      }
      this.stopTracking();
    }
  }

  render() {
    return (
      <div>
        <Head title="Add an insurance" />
        <GlobalStyles />
        <Link href="/">
          <a>← Back to my insurance list</a>
        </Link>
        <h1>Select Insurance</h1>
        <AddInsurance items={this.state.categories} addItem={this.addItem} />
      </div>
    );
  }
}
