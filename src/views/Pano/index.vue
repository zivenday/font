<template id="pano">
    <div class="pano">
        <div class="pano__form">
            <div class="pano__form-search">
                <el-form ref="form"
                         :inline="true"
                         :model="form">
                    <el-form-item>
                        <el-input v-model="form.name"
                                  placeholder="上传者"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="form.date"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
    
            <div class="pano__form-action">
                <el-button type="primary"
                           @click="addAndEditFormVisble = true"><i class="el-icon-upload el-icon--right"></i> 新增</el-button>
                <el-button type="danger"
                           icon="delete">批量删除</el-button>
            </div>
        </div>
        <div class="pano__table">
            <el-table :data="panos"
                      border
                      :v-loading="loading"
                      height="600">
                <el-table-column type="selection"
                                 width="50">
                </el-table-column>
                <el-table-column label="编号"
                                 width>
                    <template slot-scope="scope"
                              width="70">
                        <el-icon name="id"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="日期"
                                 width="150">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上传者"
                                 width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="位置"
                                 width="600">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.location }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="tag"
                                 label="类型标签"
                                 width="150"
                                 :filters="[{ text: '房产', value: '房产' }, { text: '运动', value: '运动' }]"
                                 :filter-method="filterTag">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.tag === '房产' ? 'primary' : 'success'"
                                close-transition>{{scope.row.tag}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index, scope.row)"
                                   type="primary"
                                   size="small">查看</el-button>
                        <el-button size="small"
                                   type="danger"
                                   @click="handleEdite(scope.$index, scope.row)">修改</el-button>
                        <el-button size="small"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pano__pagination">
            <el-pagination layout="prev, pager, next"
                           :total=total>
            </el-pagination>
        </div>
    
        <!--添加对话框-->
        <el-dialog title="全景图管理-提交表单"
                   v-model="addAndEditFormVisble">
            <el-form :model="addAndEditForm">
                <el-form-item label="全景图名称:"
                              :label-width="formLabelWidth">
                    <el-input v-model="addAndEditForm.name"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="全景图类型:"
                              :label-width="formLabelWidth">
                    <el-select v-model="addAndEditForm.type"
                               placeholder="请选择全景图类型">
                        <el-option label="体育"
                                   value="体育"></el-option>
                        <el-option label="房产"
                                   value="房产"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="全景图:"
                              :label-width="formLabelWidth">
                    <el-upload class="upload-demo"
                               action="https://jsonplaceholder.typicode.com/posts/"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :file-list="fileList"
                               :before-upload="beforeHandle">
                        <el-button size="small"
                                   type="primary">上传全景图封面与压缩包</el-button>
                        <div slot="tip"
                             class="el-upload__tip">限制上传两个文件，封面图片文件和全景压缩文件；封面图片限制为jpg或者png，不超过500kb，压缩文件限制为zip </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="addAndEditFormVisble = false">取 消</el-button>
                <el-button type="primary"
                           @click="submit('add')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                date: ''
            },
            addAndEditForm: {
                name: '',
                type: ''
            },
            panos: [],
            loading: false,
            total: 1000,
            addAndEditFormVisble: false,
            formLabelWidth: '90px',
            fileList: []
        }
    },
    methods:
    {
        onSubmit() {

        },
        handleClick(index, row) { },
        handleEdite(index, row) { },
        handleDelete(index, row) { },
        handleAdd() { this.AddDialogVisible = true },
        filterTag(value, row) {
            return row.tag === value;
        },
        submit(type) {
            if (type === 'add') { this.addAndEditForm }
        },
        beforeHandle(file, fileList) {
            console.log(fileList);
        },
        handleRemove(file, fileList) {
            console.log(fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>
<style lang="scss" scoped>
.pano {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;

    &__form {
        display: flex;
        min-width: 800px;
        justify-content: center;
        &-action {
            right: 0px;
        }
    }
    &__table {
        box-sizing: border-box;
        width: 100%;
    }
    &__pagination {
        display: flex;
        padding-top: 20px;
        justify-content: center;
    }
}
</style>