function parseJSON(response) {
    return response.json()
}


fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(parseJSON)
    .then(function (json) {
        //take first 50 items and then load all the relevant data about other items
        return _.take(json, 20).map(function (id) {
            return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
                .then(parseJSON);
        })
    }).then(function (promises) {
        return Promise.all(promises);
    }).then(function (allData) {
        console.log(allData);

        var Card = React.createClass({
            render: function () {
                return (
                    <div>
                        <a href={this.props.url}>
                            <h2>{this.props.title} {this.props.score}</h2>
                        </a>
                    </div>
                )
            }
        });

        var App = React.createClass({
            getInitialState: function () {
                return {data : allData};
            },

            render: function () {
                console.log(this.props);
                console.log(this.state);
                return (
                    <div>
                        {this.state.data.map(function (tile) {
                            return (
                                <Card key={tile.id} title={tile.title} score={tile.score} url={tile.url}></Card>
                            )
                        })}
                    </div>
                );
            }
        });

        React.render(<App data={allData}></App>, document.body);
    });


/**
 var ProductCategoryRow = React.createClass({
    render: function () {
        return (<tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>);
    }
});



 var ProductRow = React.createClass({
    render: function () {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

 var ProductTable = React.createClass({
    render: function () {
        console.log(this.props);
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function (product) {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

 var SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.inStockOnlyInput.getDOMNode().checked
        );
    },
    render: function () {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />

                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                        />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});

 var FilterableProductTable = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            inStockOnly: false
        };
    },

    handleUserInput: function (filterText, inStockOnly) {
        console.log(filterText, inStockOnly);
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render: function () {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
            </div>
        );
    }
});


 var PRODUCTS = [
 {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
 {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
 {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
 {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
 {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
 {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
 ];
 **/
