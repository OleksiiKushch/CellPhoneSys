package cells.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TariffController {

    @GetMapping("/tariff-catalog")
    public String showTariffCatalogPage() {
        return "tariff-catalog";
    }

    @GetMapping("/create-new-tariff")
    public String showCreateNewTariffPage() {
        return "create-new-tariff";
    }

    @GetMapping("/edit-tariff")
    public String showEditTariffPage(@RequestParam("tariffUuid") String tariffUuid) {
        return "edit-tariff";
    }
}
