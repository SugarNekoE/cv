{ pkgs, ... }:

{
  packages = [ pkgs.typst pkgs.noto-fonts-cjk-sans ];

  env.TYPST_FONT_PATHS = "${pkgs.noto-fonts}/share/fonts:${pkgs.noto-fonts-cjk-sans}/share/fonts";

  languages = {
    javascript = {
      enable = true;
      package = pkgs.nodejs_24;
      corepack = {
        enable = true;
      };
    };
  };

  git-hooks = {
    enable = true;
    hooks = {
      convco = {
        enable = true;
      };
    };
  };
}
