<template>
    <div class="feedback">
        <div class="search-form">
            <el-form :inline="true"
                     :model="formInline"
                     class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="formInline.name"
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
        <div class="feedback__table">
            <el-table :data="feedbacks"
                      :v-loading="loading"
                      border
                      style="width: 100%">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column label="编号"
                                 width="100">
                    <template scope="scope">
                        <el-icon name="id"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="日期"
                                 width="180">
                    <template scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名"
                                 width="180">
                    <template scope="scope">
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
                                 width="400">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.info }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    
        </div>
        <div class="feedback__pagination">
            <div class="block">
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :page-sizes=page.sizes
                               layout="total, sizes, prev, pager, next"
                               :total=page.total>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { queryFeedbacks, removeFeedback } from 'api/api';

export default {
    data() {
        return {
            formInline: {
                name: '',
                keywords: '',
                daterange: ''
            },
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
                pageSize: 10
            },
            page: {
                total: 0,
                sizes: [10, 20, 30],
            }
        }
    },
    mounted() {
        this.getFeedbacks();
    },
    methods: {
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
            queryFeedbacks(param).then(response => {
                let res = response.data;
                console.log(res)
                if (res.code) {
                    that.page.total = res.data.total;
                    that.feedbacks = res.data.feedbacks;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }

            })
            this.loading = false
        },
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
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
</script>
<style lang="scss" scoped>
.search-form {
    width: 1000px;
    margin: 0 auto;
}

.feedback {
    &__pagination {
        padding-top: 30px;
        width: 800px;
        margin: 0 auto;
    }
}
</style>