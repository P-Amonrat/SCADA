import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import ReactPaginate from "react-paginate"
import PropTypes from 'prop-types'
import { paginationFromTo } from "@src/utility/Utils"

const PaginationCustom = (props) => {

  const { totalPage, currentPage, perPage, handlePagination } = props
  const pageAll = Math.ceil(totalPage / perPage)

  return (
    <Fragment>
      <Row style={{ margin: "0px 0px 0px 0px" }} className={`${totalPage === 0 && 'd-none'}`}>
        <Col style={{ display: "flex", color: "#b8c2cc" }}>
          <span>
            {`showing ${paginationFromTo(perPage, currentPage, totalPage).from} to 
            ${paginationFromTo(perPage, currentPage, totalPage).to} 
            of ${totalPage} entries`}
          </span>
        </Col>
        <Col>
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => handlePagination(page)}
            pageCount={pageAll || 1}
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item next"
            previousClassName="page-item prev"
            previousLinkClassName="page-link"
            pageLinkClassName="page-link"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1"
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PaginationCustom

// ** Default Props
PaginationCustom.defaultProps = {
  totalPage: 0,
  currentPage: 0, // start 0
  perPage: 10
}

// ** PropTypes
PaginationCustom.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  totalPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired
}