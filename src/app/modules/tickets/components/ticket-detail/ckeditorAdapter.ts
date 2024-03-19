export default {
  selector: 'textarea',
  plugins: 'table image',
  toolbar: 'undo redo | formatselect | bold italic | table image',
  file_picker_types: 'image',
  file_picker_callback: (cb:any, value:any, meta:any) => {
    // Implement your custom file picker logic here
  },
};