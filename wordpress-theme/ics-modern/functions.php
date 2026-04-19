<?php
/**
 * Theme bootstrap for ICS Modern.
 *
 * @package ICS_Modern
 */

if (!defined('ABSPATH')) {
    exit;
}

function ics_modern_setup(): void
{
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('assets/css/site.css');

    register_nav_menus([
        'primary' => __('Primary Navigation', 'ics-modern'),
        'footer'  => __('Footer Navigation', 'ics-modern'),
    ]);
}
add_action('after_setup_theme', 'ics_modern_setup');

function ics_modern_assets(): void
{
    wp_enqueue_style(
        'ics-modern-fonts',
        'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700;800&family=Manrope:wght@400;500;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'ics-modern-site',
        get_theme_file_uri('assets/css/site.css'),
        ['ics-modern-fonts'],
        wp_get_theme()->get('Version')
    );

    wp_enqueue_script(
        'ics-modern-site',
        get_theme_file_uri('assets/js/site.js'),
        [],
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'ics_modern_assets');

function ics_modern_register_post_types(): void
{
    register_post_type('ics_service', [
        'labels' => [
            'name'          => __('Services', 'ics-modern'),
            'singular_name' => __('Service', 'ics-modern'),
        ],
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-hammer',
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'services'],
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
    ]);

    register_post_type('ics_project', [
        'labels' => [
            'name'          => __('Projects', 'ics-modern'),
            'singular_name' => __('Project', 'ics-modern'),
        ],
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-building',
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'projects'],
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
    ]);
}
add_action('init', 'ics_modern_register_post_types');
