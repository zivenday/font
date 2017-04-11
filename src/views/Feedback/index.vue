<template>
    <div class="feedback">
        <div class="search-form">
            <el-form :inline="true"
                     :model="formInline"
                     class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.keywords"
                              placeholder="用户名/反馈关键词"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker v-model="formInline.daterange"
                                    type="daterange"
                                    align="right"
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
            <el-table :data="tableData"
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
                            <p>反馈信息: {{ scope.row.feedback }}</p>
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
                        <span style="margin-left: 10px">{{ scope.row.feedback }}</span>
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
                               :current-page="currentPage4"
                               :page-sizes="[1]"
                               :page-size="1"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="1">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { deleteFeedback } from 'api/api';
export default {
    data() {
        return {
            formInline: {
                keywords: '',
                daterange: ''
            },
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
            tableData: [{
                id: 1,
                date: '2016-05-02',
                name: '广州王一',
                feedback: '反馈信息样本反馈信息样本反馈信息样本反馈信息样本'
            }, {
                id: 2,
                date: '2016-05-04',
                name: '上海张三',
                feedback: '反馈信息样本反馈信息样本反馈信息样本反馈信息样本'
            }, {
                id: 3,
                date: '2016-05-01',
                name: '广州李四',
                feedback: '反馈信息样本反馈信息样本反馈信息样本'
            }, {
                id: 4,
                date: '2016-05-03',
                name: '北京杨五',
                feedback: '反馈信息样本反馈信息样本反馈信息样本反馈信息样本反馈信息样本反馈信息样本反馈信息样本反馈信息样本'
            }],
            currentPage4: 4

        }
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        getInfo() {

        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeFeedback(row.id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'alert',
                        message: '删除失败'
                    });
                })
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style lang="scss" scoped>
.search-form {
    width: 800px;
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