// @flow
import * as React from "react";
import { connect } from "react-redux";
import Home from "../../screens/Home";
import datas from "./data";
import { fetchList } from "./actions";

export interface Props {
	navigation: any,
	fetchList: Function,
	data: Object,
}
export interface State { }

const bindAction = (dispatch) => {
	return {
		fetchList: url => dispatch(fetchList(url)),
	};
};

const mapStateToProps = state => ({
	data: state.homeReducer.list,
	isLoading: state.homeReducer.isLoading,
});

@connect(mapStateToProps, bindAction)
class HomeContainer extends React.Component<Props, State> {

	componentDidMount() {
		this.props.fetchList(datas);
	}

	render() {
		throw new Error("error what happened");
		return <Home navigation={this.props.navigation} list={this.props.data} />;
	}
}

export default HomeContainer;
