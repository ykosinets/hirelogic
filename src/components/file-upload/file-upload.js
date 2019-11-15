export default function FileUpload() {
	let self = this;
	this.fileData = {};
	const dropZone = document.querySelector('.file-loader-drop-area');
	const input = dropZone.querySelector('input[type="file"]');
	const message = dropZone.querySelector('.file-loader-drop-message');
	const preview = document.querySelector('.file-loader-preview');
	const previewImg = preview.querySelector('img');
	const previewInfo = preview.querySelector('.file-loader-preview-info');
	const previewRemove = preview.querySelector('.file-loader-preview-remove');
	let temp = previewImg.src;

	this.readFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			this.fileData = {
				name: files[i].name,
				size: files[i].size,
				type: files[i].type.split('/')[0],
			};

			let reader = new FileReader();
			reader.onload = (e) => {
				if (this.fileData.type === "image") {
					previewImg.src = e.target.result;
					console.log();
					message.classList.remove('active');
					preview.classList.add('active');
					previewImg.onload = () => {
						previewInfo.innerHTML = this.fileData.name + ' (' + previewImg.naturalWidth + ' x ' + previewImg.naturalHeight + ')';
					}
				} else {
					preview.classList.remove('active');
					message.classList.add('active');
					previewImg.src = temp;
					previewInfo.innerHTML = '';
				}
			};
			reader.readAsDataURL(files[i]);
		}

		return this.fileData;
	};

	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	previewRemove.onclick = function(e){
		e.stopPropagation();
		preview.classList.remove('active');
		message.classList.add('active');
		previewImg.src = temp;
		previewInfo.innerHTML = '';
	};

	preview.onclick = function () {
		if(!preview.classList.contains('active')) {
			input.click();
		}
	};
	dropZone.ondragover = function () {
		this.classList.add('hover');
		return false;
	};
	dropZone.ondragend = function () {
		this.classList.remove('hover');
		return false;
	};
	dropZone.ondrop = function (e) {
		e.target.classList.remove('hover');
		e.preventDefault();
		self.readFiles(e.dataTransfer.files);
	};

	console.log(input);
	input.onchange = function(e){
		self.readFiles(this.files);
	}
};
