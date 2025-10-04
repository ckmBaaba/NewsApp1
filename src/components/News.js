import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    console.log("Hello I am");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title = `${this.cap(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2460a17e05c64eb7a2124e6116a0c2d7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

  }

  async componentDidMount() {

    this.updateNews();
  }

  handlePrevClick = async () => {

    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  };

  handleNextClick = async () => {

    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }


  render() {
    return (
      <div className="container my -3">
        <h1 className="text-center my-3">NewsMonkey - Top Headline on {this.cap(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &#8592; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
