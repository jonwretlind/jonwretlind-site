<?php

/**
 * Handle HTML content properly in Markdown files
 */
class PicoHTMLFix extends AbstractPicoPlugin
{
    protected $enabled = true;
    protected $pico;

    public function __construct(Pico $pico)
    {
        parent::__construct($pico);
        $this->pico = $pico;
    }

    public function onParsedownRegistered(&$parsedown)
    {
        $parsedown->setMarkupEscaped(false);
        $parsedown->setBreaksEnabled(true);
        
        if (method_exists($parsedown, 'setSafeMode')) {
            $parsedown->setSafeMode(false);
        }
    }

    public function onContentLoading(&$file)
    {
        // No action needed
    }

    public function onContentLoaded(&$rawContent)
    {
        if (empty($rawContent)) {
            $rawContent = ' ';
            return;
        }

        // Clean the content
        $rawContent = str_replace("\0", '', $rawContent);
        $rawContent = trim($rawContent);
    }

    public function onContentParsing(&$content)
    {
        if (empty($content)) {
            $content = ' ';
            return;
        }

        // Ensure HTML is treated as HTML, not markdown
        if (strpos(trim($content), '<') === 0) {
            $content = "\n" . $content;
        }
    }

    public function onContentParsed(&$content)
    {
        if (empty($content)) {
            $content = ' ';
        }
    }
} 