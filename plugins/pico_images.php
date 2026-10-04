<?php
/**
 * Access images of the current pages folder with in Pico CMS.
 *
 * @author  Wilco Verhoeven
 * @license The MIT License <http://opensource.org/licenses/MIT>
 * @version 1.0
 */
final class Pico_Images extends AbstractPicoPlugin{
    
    protected $enabled = true;
    
	private $path;
    private $assets_dir;

	/**
	 * Get the images path.
	 */
    public function onRequestUrl(&$url){
        $this->path = $this->format($url);
    }
    
    /**
    * Get content directory.
    **/
    public function onConfigLoaded(array &$config){   
        $this->content_dir = $config['assets_dir'];
    }
    
    /**
    * Set page parent-folder url, Twig variable {{ page.parent }} or {{ currentpage.parent }}.
    **/
    public function onSinglePageLoaded(array &$pageData){
        $pico = $this->getPico();
        $base_url = $pico->getBaseUrl();
        $page_id = $pageData['id'];
        
        $url = $base_url . basename($this->content_dir) . '/' . $page_id;
        $url = $this->format($url);
        
        $pageData['parent'] = $url;
    }

	/**
	 * Add the images data Twig variable {{ images }}.
	 */
    public function onPageRendering(Twig_Environment &$twig, array &$twigVariables, &$templateName){
        try {
            $images = $this->images_list($this->content_dir . $this->path, $twigVariables['current_page']);
            $twigVariables['images'] = !empty($images) ? $images : array();
        } catch (Exception $e) {
            error_log('Pico_Images error: ' . $e->getMessage());
            $twigVariables['images'] = array();
        }
    }

	/**
	 * Remove trailing 'index' and add trailing slash if missing.
	 */
	private function format($path){
		$is_index = strripos($path, 'index') === strlen($path)-5;
		if( $is_index ) return substr($path, 0, -5);
		elseif( substr($path, -1) != '/' ) $path .= '/';
		return $path;
	}
    
	/**
	 * Return a list of images with image information
	 */
	private function images_list($images_path, $pageData){
		if (empty($images_path) || empty($pageData)) {
			return array();
		}

		$data = array();
		$files = glob($images_path.'*');
		
		if (!is_array($files)) {
			return array();
		}

		$images = array();
		foreach( $files as $file ){
			if(preg_match('/\.(jpe?g|png|gif|bmp)$/i', $file)) {
        		$images[] = $file;
    		}
		}

		foreach( $images as $path )
		{
			if (!file_exists($path)) {
				continue;
			}

			try {
				list(, $filename, $ext, $name) = array_values(pathinfo($path));
				list($width, $height) = getimagesize($path);

				$pico = $this->getPico();
				$base_url = $pico->getBaseUrl();
				$page_id = isset($pageData['id']) ? $pageData['id'] : '';
				
				$url = $base_url . basename($this->content_dir) . '/' . $page_id;
				$url = $this->format($url);

				$data[] = array (
					'base_dir' => $url,
					'filename' => $filename,
					'name' => $name,
					'ext' => $ext,
					'width' => $width,
					'height' => $height
				);
			} catch (Exception $e) {
				error_log('Error processing image ' . $path . ': ' . $e->getMessage());
				continue;
			}
		}
		return $data;
	}
}

?>