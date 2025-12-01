package cl.duoc.style.and.beauty.promocion.service;

import cl.duoc.style.and.beauty.promocion.dto.PromocionDTO;
import cl.duoc.style.and.beauty.promocion.dto.PromocionRequestDTO;
import cl.duoc.style.and.beauty.promocion.model.Promocion;
import cl.duoc.style.and.beauty.promocion.repository.PromocionRepository;
import cl.duoc.style.and.beauty.servicio.model.Servicio;
import cl.duoc.style.and.beauty.servicio.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromocionService {

    private final PromocionRepository promocionRepository;
    private final ServicioRepository servicioRepository;
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public PromocionService(PromocionRepository promocionRepository, ServicioRepository servicioRepository) {
        this.promocionRepository = promocionRepository;
        this.servicioRepository = servicioRepository;
    }

    private PromocionDTO toDTO(Promocion p) {
        PromocionDTO dto = new PromocionDTO();
        dto.setId(p.getId());
        dto.setServicioId(p.getServicio().getId());
        dto.setServicioNombre(p.getServicio().getNombre());
        dto.setDescuento(p.getDescuento());
        dto.setFechaInicio(sdf.format(p.getFechaInicio()));
        dto.setFechaFin(sdf.format(p.getFechaFin()));
        dto.setActiva(p.getActiva());
        return dto;
    }

    public List<PromocionDTO> findAll() {
        return promocionRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PromocionDTO findById(Long id) {
        return promocionRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public PromocionDTO save(PromocionRequestDTO dto) {
        Servicio servicio = servicioRepository.findById(dto.getServicioId())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        Promocion p = new Promocion();
        p.setServicio(servicio);
        p.setDescuento(dto.getDescuento());

        try {
            p.setFechaInicio(sdf.parse(dto.getFechaInicio()));
            p.setFechaFin(sdf.parse(dto.getFechaFin()));
        } catch (Exception e) {
            throw new RuntimeException("Formato de fecha incorrecto");
        }

        p.setActiva("S");

        return toDTO(promocionRepository.save(p));
    }

    public void delete(Long id) {
        promocionRepository.deleteById(id);
    }
}
