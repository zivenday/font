let apiUrl='';
export const removeFeedback=param=>{this.$resource(`${apiUrl}/feedback/remove`).remove({id:param})}