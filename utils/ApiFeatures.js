import moment from 'moment';

export class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  searchEmployee() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { username: { $regex: this.queryStr.keyword, $options: 'i' } },
            { role: { $regex: this.queryStr.keyword, $options: 'i' } },
            { idno: { $regex: this.queryStr.keyword, $options: 'i' } },
            { designation: { $regex: this.queryStr.keyword, $options: 'i' } },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  searchTitle() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [{ title: { $regex: this.queryStr.keyword, $options: 'i' } }],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  searchByDate() {
    // const toDate = moment(this.queryStr.to, "MM-DD-YYYY").subtract(-30, "days").format("MM-DD-YYYY")

    const keyword = this.queryStr.from
      ? {
          createdAt: {
            $gte: moment(this.queryStr.from, 'MM-DD-YYYY').format('MM-DD-YYYY'),
            $lte: moment(this.queryStr.to, 'MM-DD-YYYY').subtract(-1, 'days').format('MM-DD-YYYY'),
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  searchLeaveByDate() {
    const keyword = this.queryStr.from
      ? {
          from: {
            $gte: moment(this.queryStr.from, 'MM-DD-YYYY').format('MM-DD-YYYY'),
            $lte: moment(this.queryStr.to, 'MM-DD-YYYY').format('MM-DD-YYYY'),
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  searchHoliday() {
    const keyword = this.queryStr.from
      ? {
          holidayStart: {
            $gte: moment(this.queryStr.from, 'DD-MM-YYYY').format('MM-DD-YYYY'),
            $lte: moment(this.queryStr.to, 'DD-MM-YYYY').format('MM-DD-YYYY'),
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Pagination
  pagination() {
    let resultPerPage = this.queryStr.perpage;
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
