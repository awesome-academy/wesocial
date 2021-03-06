class PictureUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  # process :convert => 'png'
  # process :tags => ['user_post.file']
  version :standard do
    process :resize_to_fill => [300, 300, :north]
  end

  version :thumbnail do
    resize_to_fit(50, 50)
  end

  def file_video
  	File.extname(params[:user_post][:file].original_filename) == ["mp4", "wmv", "avi", "flv", "gif"]
  end

  def image
  	File.extname(params[:user_post][:file].original_filename) == ["jpg", "jpeg", "png"]
  end

  def extension_whitelist
    %w(jpg jpeg gif png mp4 wmv flv avi)
  end
end
