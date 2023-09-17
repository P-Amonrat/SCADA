import { Fragment, useState } from "react"
import { Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import ReactPaginate from "react-paginate"
import PropTypes from 'prop-types'
import { paginationFromTo } from "@src/utility/Utils"
import { ChevronDown, ChevronUp } from 'react-feather'

const PaginationAndRowPerPage = (props) => {
  const { totalPage, currentPage, perPage, handlePagination, handleRowPerPage } = props
  const pageAll = Math.ceil(totalPage / perPage)
  const [open, setOpen] = useState(false)
  const [rowPerPage, setRowPerPage] = useState(perPage)

  const dataRow = [10, 50, 100]
  const toggle = () => setOpen(prevState => !prevState)

  const onChangeRow = (value) => {
    setRowPerPage(value)
    handleRowPerPage(value)
  }

  return (
    <Fragment>
      <Row style={{ margin: "0px 0px 0px 0px" }} className={`${totalPage === 0 && 'd-none'}`}>
        <Col style={{ color: "#b8c2cc" }}>
          <span>
            {`showing ${paginationFromTo(perPage, currentPage, totalPage).from} to 
            ${paginationFromTo(perPage, currentPage, totalPage).to} 
            of ${totalPage} entries`}
          </span>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="mr-50" style={{ color: "#b8c2cc" }}>Rows per page: </div>
          <UncontrolledDropdown isOpen={open} toggle={toggle} className="mr-1">
            <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
              {rowPerPage}
              {open ? <ChevronUp size={14} style={{marginTop: "-3px", marginLeft: "5px"}}/> : <ChevronDown size={14} style={{marginTop: "-3px", marginLeft: "5px"}}/> }
            </DropdownToggle>
            <DropdownMenu right className="dropdown-per-page">
              {dataRow.map(item => (
                <DropdownItem onClick={e => onChangeRow(item)} className='w-100' key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => handlePagination({page: page.selected + 1, rowPerPage})}
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

export default PaginationAndRowPerPage

// ** Default Props
PaginationAndRowPerPage.defaultProps = {
  totalPage: 0,
  currentPage: 0, // start 0
  perPage: 10
}

// ** PropTypes
PaginationAndRowPerPage.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  totalPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  handleRowPerPage: PropTypes.func.isRequired
}