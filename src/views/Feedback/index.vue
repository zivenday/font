<template>
    <div class="feedback">
        <div class="search-form">
            <el-form :inline="true"
                     :model="formInline"
                     class="form-inline">
                <el-form-item label="用户名">
                    <el-input id="el-input__change"
                              v-model="formInline.name"
                              placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="请输入反馈关键词"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker v-model="formInline.daterange"
                                    type="daterange"
                                    align="right"
                                    format="yyyy-MM-dd"
                                    placeholder="选择日期范围"
                                    :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="feedback__container">
            <div class="feedback__table">
                <el-table :data="feedbacks"
                          :v-loading="loading"
                          height="641"
                          stripe
                          border
                          style="width: 100%"
                          :default-sort="{prop:'id',order:'descending'}">
                    <el-table-column type="selection"
                                     sortable
                                     width="55">
                    </el-table-column>
                    <el-table-column label="编号"
                                     prop='id'
                                     sortable
                                     width="100">
                        <template slot-scope="scope">
                            <el-icon name="id"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="日期"
                                     prop='date'
                                     sortable
                                     width="150">
                        <template slot-scope="scope">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <el-popover trigger="hover"
                                        placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>反馈信息: {{ scope.row.info }}</p>
                                <div slot="reference"
                                     class="name-wrapper">
                                    <el-tag>{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="反馈信息"
                                     width="500">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.info }}</span>
                        </template>
                    </el-table-column>
    
                    <el-table-column label="操作"
                                     width="200">
                        <template slot-scope="scope">
                            <el-button size="small"
                                       type="primary"
                                       @click="handleClick(scope.$index, scope.row)">查看</el-button>
                            <el-button size="small"
                                       type="danger"
                                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
    
            </div>
        </div>
        <div class="feedback__pagination">
            <div class="block">
                <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { queryFeedbacks, removeFeedback } from 'api/api';
import 'common/index';
export default {
    data() {
        return {
            formInline: {
                name: '',
                keywords: '',
                daterange: ''
            },
            currentPage:1,
            loading: false,
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            feedbacks: [],
            filtr: {
                name: '',
                kyw: '',
                bdate: '',
                edate: '',
                page: 1,
                pageSize: 15
            },
            page: {
                total: 0,
                sizes: [15, 20, 25, 30],
            }
        }
    },
    mounted() {
        this.getFeedbacks();
    },
    methods: {
        handleCurrentChange(){},
        onSubmit() {
            this.filtr.name = this.formInline.name;
            this.filtr.kyw = this.formInline.keywords;
            this.filtr.bdate = this.formInline.daterange[0] ? new Date(this.formInline.daterange[0]).Format("yyyy-MM-dd") : '';
            this.filtr.edate = this.formInline.daterange[1] ? new Date(this.formInline.daterange[1]).Format("yyyy-MM-dd") : '';
            console.log(this.filtr)
            this.getFeedbacks();
        },
        getFeedbacks() {
            let that = this;
            let param = this.filtr;
            this.loading = true;
            queryFeedbacks({id:'',page:this.filtr.page, pageSize:this.filtr.pageSize}).then(res => {
                 this.loading = false;
                console.log(res.data)
                 if (!res.data.code) {
                    that.page.total = res.data.total;
                    that.feedbacks = res.data.feedbackList;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                } 
            })
        },
        handleClick(index, row) { },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                removeFeedback({ id: row.id }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getFeedbacks()
                    this.loading = false
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    });
                })
            });
        },
        handleSizeChange(val) {
            this.filtr.pageSize = val;
            this.getFeedbacks();
        },
        handleCurrentChange(val) {
            this.filtr.page = val;
            this.getFeedbacks();
        }
    }
}

</script>
<style lang="scss" scoped>
.search-form {
    width: 1000px;
    margin: 0 auto;
    .el-form {
        &-item {
            &__content {
                .el-input {
                    &__inner {
                        color: red!important;
                    }
                }
            }
        }
    }
}

.feedback {
    &__pagination {
        padding-top: 30px;
        width: 800px;
        margin: 0 auto;
    }
}
</style>